//Stories actions
import {makeApiRequest} from '../../services/requests';
import {SET_USER_PROFILE} from '../types';

//Path prefix
const PREFIX = '/api/profiles/';

//Action creators
//Retrieving profile information
export const retrievingProfile = (userId) => async dispatch => {
  try {
    const path = PREFIX + userId;
    const response = await makeApiRequest('get', path, null);
    dispatch({type: SET_USER_PROFILE, payload: response.data});

  } catch (err) {
    console.log(err);
  }
}
