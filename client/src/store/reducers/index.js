//Root reducer
import { combineReducers } from 'redux';
import errors from './errors';
import user from './user';
import stories from './stories';


const rootReducer = combineReducers({
  errors,
  user,
  stories
});

export default rootReducer;
