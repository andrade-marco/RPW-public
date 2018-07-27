import {SET_ERROR, REMOVE_ERROR} from '../types';

const DEFAULT_STATE = {
  error: null
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {...state, error: action.payload};
    case REMOVE_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}
