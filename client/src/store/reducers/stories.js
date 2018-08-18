//Stories reducer
//Responsible for setting/updating part of global state related to stories
import {
  SET_ALL_STORIES,
  SET_SAMPLE_STORIES,
  SET_MY_STORIES,
  SET_CURRENT_STORY,
  SET_MY_SEGMENTS
} from '../types';

//Default state - empty stories, user stories, segments, and current story
const DEFAULT_STATE = {
  allStories: [],
  sampleStories: [],
  myStories: [],
  mySegments: [],
  currentStory: {}
}

//Reducer
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Set all stories available from API
    case SET_ALL_STORIES:
      return {...state, allStories: action.payload};
    //Set randomized sample stories for landing page (NOT IN USE)
    case SET_SAMPLE_STORIES:
      return {...state, sampleStories: action.payload};
    //Set stories created by current user
    case SET_MY_STORIES:
      return {...state, myStories: action.payload};
    //Set story being visualized by current user
    case SET_CURRENT_STORY:
      return {...state, currentStory: action.payload}
    //Set all segments created by current user
    case SET_MY_SEGMENTS:
      return {...state, mySegments: action.payload}
    default:
      return state;
  }
}
