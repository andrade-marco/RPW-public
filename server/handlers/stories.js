//Stories & Segments
//Handler functions for stories and segment routes
const db = require('../models');
const VOTING_WINDOW = 8.64e7; //24hrs - 8.64e7

//Helper functions
//Updating segment and story after voting is completed
async function updateSegment(segmentId, storyId) {
  try {
    //Find story and segment that need to be updated
    console.log('Updating segment: ', segmentId);
    const foundSegment = await db.Segment.findOne({_id: segmentId});
    const foundStory = await db.Story.findOne({_id: storyId});

    //Compute votes and decide if passed or failed
    const totalVotes = foundSegment.votes.length;
    const positives = foundSegment.votes.filter(val => val.choice === 'positive');
    const passed = (totalVotes > 0) ? positives.length / totalVotes > 0.5 : true;

    //Set the segment status as 'accepted' or 'rejected' depending on votes
    foundSegment.status = (passed) ? 'accepted' : 'rejected';
    foundStory.status = 'open';
    foundSegment.save();
    foundStory.save();

  } catch (err) {
    //Unhandled error
    console.log(err);
  }
}

//Helper function to populate segments and author information for all stories or specific story
//depending on params passed
function getStory(storyId, userId) {
  const authorPop = {path: 'author', select: 'username'};

  //Find and populate for specific story
  if (storyId) {
    return db.Story.findOne({_id: storyId})
                   .populate('segments')
                   .populate(authorPop)
                   .exec();
  } else if (userId) {
    //Find and populate current user's stories
    return db.Story.find({author: userId}).populate('segments')
                            .populate(authorPop)
                            .exec();
  } else {
    //Find and populate all stories
    return db.Story.find({}).populate('segments')
                            .populate(authorPop)
                            .exec();
  }
}

//Export handlers
//Retrieve all stories in DB
exports.retrieveAllStories = async function(req, res, next) {
  try {
    //Check if only looking for stories from current user or all stories
    const {userId} = req.query;
    const allStories = (userId) ? await getStory(null, userId) : await getStory();
    return res.status(200).json(allStories);
  } catch (err) {
    return next(err);
  }
}

//Retrieve sample stories (NOT IN USE)
exports.retrieveSampleStories = async function(req, res, next) {
  try {
    const allStories = await getStory();
    const sample = allStories.filter((val,i) => i <= 2);
    return res.status(200).json(sample);

  } catch (err) {
    return next(err);
  }
}

//Retrieve specific story
exports.retrieveStory = async function(req, res, next) {
  try {
    const foundStory = await getStory(req.params.storyId);
    return res.status(200).json(foundStory);
  } catch (err) {
    return next(err);
  }
}

//Retrieve user segments
exports.retrieveSegments = async function(req, res, next) {
  try {
    const {userId} = req.params;
    const userSegments = await db.Segment.find({author: userId}).populate('story').exec();
    return res.status(200).json(userSegments);
  } catch (err) {
    return next(err);
  }
}

//Create new story
exports.createNewStory = async function(req, res, next) {
  try {
    const storyData = req.body;
    storyData.author = req.user._id;
    storyData.subscribers = [req.user._id];
    const newStory = await db.Story.create(storyData);
    return res.status(200).json(newStory);
  } catch (err) {
    return next(err);
  }
}

//Create new segment
exports.createNewSegment = async function(req, res, next) {
  try {
    //Gather data for creating new segment
    const segmentData = req.body;
    segmentData.story = req.params.storyId;
    segmentData.author = req.user._id;

    //Get parent story
    const parentStory = await db.Story.findOne({_id: req.params.storyId});
    const newSegment = await db.Segment.create(segmentData);

    //Update parent story with new segment and status
    parentStory.segments.push(newSegment._id);
    parentStory.status = 'voting';
    await parentStory.save();

    //Updates the segment status after voting window closes
    setTimeout(() => updateSegment(newSegment._id, parentStory._id), VOTING_WINDOW);

    //Get the updated parent story with populate segments and author
    const updatedStory = await getStory(req.params.storyId);
    return res.status(200).json(updatedStory);

  } catch (err) {
    return next(err);
  }
}

//Updating story subscribers
exports.updateSubscribers = async function(req, res, next) {
  try {
    //Find story and look if current user is subscriber
    const foundStory = await getStory(req.params.storyId);
    const index = foundStory.subscribers.findIndex(val => val.toString() === req.user._id);

    //If user is subscriber, unsubscribe user otherwise add as subscriber
    if (index >= 0) {
      const filtered = foundStory.subscribers.filter(val => val.toString() !== req.user._id);
      foundStory.subscribers = filtered;
    } else {
      foundStory.subscribers.push(req.user._id);
    }

    foundStory.save();
    return res.status(200).json(foundStory);

  } catch (err) {
    return next(err);
  }
}

//Updating votes on segments
exports.updateSegmentVote = async function(req, res, next) {
  try {
    const { choice } = req.body;
    const voter = req.user._id;
    const foundSegment = await db.Segment.findOne({ _id: req.params.segmentId });

    //Check if segment is still in voting status
    //Then check if user has already voted and if so update vote with new choice
    //If user has not voted, add new vote to segment voting array
    let response;
    if (foundSegment.status === 'voting') {
      const index = foundSegment.votes.findIndex(val => val.voter === voter);
      if (index > -1) {
        foundSegment.votes[index].choice = choice;
      } else {
        foundSegment.votes.push({voter, choice});
      }

      foundSegment.save();
      response = {
        success: true,
        name: 'VoteUpdated',
        message: 'Vote successfully updated'
      };

    } else {
      //If voting window is closed, return the story itself
      const foundStory = await getStory(req.params.storyId);
      response = foundStory;
    }

    return res.status(200).json(response);

  } catch (err) {
    return next(err);
  }
}
