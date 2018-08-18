//User reducer
//Responsible for setting/updating part of global state related to current user's information
// and profile (profile not being used currently)
import {SET_CURRENT_USER, SET_USER_PROFILE} from '../types';

//Default state -  no user/profile
const DEFAULT_STATE = {
  currentUser: {},
  userProfile: {}
}

//Reducer
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Sets current user basic information
    case SET_CURRENT_USER:
      return {...state, currentUser: action.payload};
    //Sets current user profile (NOT IN USE)
    case SET_USER_PROFILE:
      return {...state, userProfile: action.payload};
    default:
      return state;
  }
}
