//Error reducer
import {SET_ERROR, REMOVE_ERROR} from '../types';

//Default state - no error
const DEFAULT_STATE = {
  error: null
}

//Reducer
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Set global error
    case SET_ERROR:
      return {...state, error: action.payload};
    //Clears global error
    case REMOVE_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}
