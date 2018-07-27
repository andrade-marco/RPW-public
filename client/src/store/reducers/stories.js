import {
  SET_ALL_STORIES,
  SET_SAMPLE_STORIES,
  SET_MY_STORIES,
  SET_CURRENT_STORY,
  SET_MY_SEGMENTS
} from '../types';

const DEFAULT_STATE = {
  allStories: [],
  sampleStories: [],
  myStories: [],
  mySegments: [],
  currentStory: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ALL_STORIES:
      return {...state, allStories: action.payload};
    case SET_SAMPLE_STORIES:
      return {...state, sampleStories: action.payload};
    case SET_MY_STORIES:
      return {...state, myStories: action.payload};
    case SET_CURRENT_STORY:
      return {...state, currentStory: action.payload}
    case SET_MY_SEGMENTS:
      return {...state, mySegments: action.payload}
    default:
      return state;
  }
}
