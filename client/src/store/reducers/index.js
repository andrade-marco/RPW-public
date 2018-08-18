//Root reducer
//Responsible for combining all reducers
import { combineReducers } from 'redux';
import errors from './errors';
import user from './user';
import stories from './stories';

//Root reducer
const rootReducer = combineReducers({
  errors,
  user,
  stories
});

//Export
export default rootReducer;
