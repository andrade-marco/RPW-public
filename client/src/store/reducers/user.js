import {SET_CURRENT_USER, SET_USER_PROFILE} from '../types';

const DEFAULT_STATE = {
  currentUser: {},
  userProfile: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {...state, currentUser: action.payload};
    case SET_USER_PROFILE:
      return {...state, userProfile: action.payload};
    default:
      return state;
  }
}
