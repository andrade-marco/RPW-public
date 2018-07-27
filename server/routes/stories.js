//Stories & segments
const express = require('express');
const router = express.Router();
const {loginRequired} = require('../middleware/auth');
const {
  retrieveAllStories,
  retrieveSampleStories,
  retrieveStory,
  retrieveSegments,
  createNewStory,
  createNewSegment,
  updateSubscribers,
  updateSegmentVote
} = require('../handlers/stories');

//Routes
//Retrieving stories & segments
router.get('/sample', retrieveSampleStories);
router.get('/', loginRequired, retrieveAllStories);
router.get('/:storyId', loginRequired, retrieveStory);
router.get('/segments/:userId', loginRequired, retrieveSegments);

//Creating new story & segment
router.post('/', loginRequired, createNewStory);
router.post('/:storyId/segments/new', loginRequired, createNewSegment);

//Updating subscribers
router.put('/:storyId/subscribers', loginRequired, updateSubscribers);

//Voting on segments
router.put('/:storyId/segments/:segmentId', loginRequired, updateSegmentVote);

module.exports = router;
