//Stories actions
import {makeApiRequest, processError} from '../../services/requests';
import {
  SET_ALL_STORIES,
  SET_SAMPLE_STORIES,
  SET_MY_STORIES,
  SET_CURRENT_STORY,
  SET_MY_SEGMENTS,
  SET_ERROR,
  REMOVE_ERROR
} from '../types';

//Path prefix
const PREFIX = '/api/stories/';

//Action creators
//Fetch stories or user-specific stories depending on params passed
export const fetchingStories = (storyId, userId) => async dispatch => {
  try {
    let path = PREFIX;
    let actionType = SET_ALL_STORIES;

    //Determines which type of action and API path
    if (storyId) {
      path += storyId;
      actionType = SET_CURRENT_STORY;
    } else if (userId) {
      path = '/api/stories?userId=' + userId;
      actionType = SET_MY_STORIES;
    }

    const response = await makeApiRequest('get', path, null);
    dispatch({type: actionType, payload: response.data});

  } catch (err) {
    //Unhandled error - needs update
    console.log(err.response);
  }
}

//Fetch randomized sample stories to be displayed on landing page
//Note: this is currently not being used
export const fetchingSampleStories = () => async dispatch => {
  try {
    const path = PREFIX + 'sample';
    const response = await makeApiRequest('get', path, null);
    dispatch({type: SET_SAMPLE_STORIES, payload: response.data});

  } catch (err) {
    //Unhandled error - needs update
    console.log(err);
  }
}

//Fetch segments create by current user
export const fetchingSegments = userId => async dispatch => {
  try {
    const path = PREFIX + 'segments/' + userId;
    const response = await makeApiRequest('get', path, null);
    dispatch({type: SET_MY_SEGMENTS, payload: response.data});
  } catch (err) {
    //Unhandled error - needs update
    console.log(err.response);
  }
}

//Sends basic information for creating new story
export const creatingNewStory = (storyData, callback) => async dispatch => {
  try {
    const path = PREFIX;
    await makeApiRequest('post', path, storyData);
    callback();

  } catch (err) {
    const {message} = err.response.data.error;
    const errorMessage = 'Error(s) occurred: ' + processError(message).join('; ');
    dispatch({type: SET_ERROR, payload: errorMessage});

  }
}

//Updates whether or not user is subscriber to specific story
export const updatingSubscribers = storyId => async dispatch => {
  try {
    const path = PREFIX + storyId + '/subscribers';
    const response = await makeApiRequest('put', path, null);
    dispatch({type: SET_CURRENT_STORY, payload: response.data});

  } catch (err) {
    //Unhandled error - needs update
    console.log(err.response);
  }
}

//Sends basic information for creating new segment
export const creatingNewSegment = (storyId, content) => async dispatch => {
  try {
    const path = PREFIX + storyId + '/segments/new';
    const response = await makeApiRequest('post', path, {content});
    dispatch({type: SET_CURRENT_STORY, payload: response.data});

  } catch (err) {
    const {message} = err.response.data.error;
    const errorMessage = 'Error(s) occurred: ' + processError(message).join('; ');
    dispatch({type: SET_ERROR, payload: errorMessage});
  }
}

//Updates voting choice of current user
export const updatingVote = (choice, storyId, segmentId, callback) => async dispatch => {
  try {
    const path = PREFIX + storyId + '/segments/' + segmentId;
    const response = await makeApiRequest('put', path, {choice});
    const {success} = response.data;
    if (success) {
      callback();
    } else {
      //Handles case in which voting window has closed already
      dispatch({type: SET_CURRENT_STORY, payload: response.data});
    }

  } catch (err) {
    //Unhandled error - needs update
    console.log(err.response);
  }
}

//Clears global error to remove any error messages
export const clearingError = () => dispatch => {
  dispatch({type: REMOVE_ERROR});
}
