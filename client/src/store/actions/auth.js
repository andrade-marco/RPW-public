//Authentication actions
import {makeApiRequest, processError, setTokenHeader} from '../../services/requests';
import {SET_CURRENT_USER, SET_ERROR, REMOVE_ERROR} from '../types';

//Action creators
//Attempts to sign in or sign up user
export const signingUser = (type, formData, callback) =>  async dispatch => {
  try {
    const path = '/api/auth/' + type;
    const response = await makeApiRequest('post', path, formData);
    localStorage.setItem("jwtToken", response.data.token);
    setTokenHeader(response.data.token);

    //Dispatch current user's information
    dispatch({type: SET_CURRENT_USER, payload: response.data});
    callback();

  } catch (err) {
    //Sets up global error in case sign in/up failed
    const {name, message} = err.response.data.error;
    let errorMessage;
    if (name === 'InvalidUsernamePassword') {
      errorMessage = message;
    } else if (name === 'ValidationError') {
      errorMessage = 'Error(s) occurred: ' + processError(message).join('; ');
    } else if (name === 'MongoError') {
      errorMessage = 'User with provided pen name and/or email already exists.'
    } else {
      errorMessage = 'An error occurred. Please try again';
    }

    dispatch({type: SET_ERROR, payload: errorMessage});
  }
}

//Signs out user by clearing token and removing current user
export const signingOutUser = callback => dispatch => {
  localStorage.clear();
  setTokenHeader(null);
  dispatch({type: SET_CURRENT_USER, payload: {}});
  callback();
}

//Clears global error to remove any error messages
export const clearingError = () => dispatch => {
  dispatch({type: REMOVE_ERROR});
}
