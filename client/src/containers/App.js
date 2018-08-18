/*
ROLE PLAYING WORDS (RPW)

This app allows users to create stories collectively.
Users can create stories that other users can contribute to
and the community decides if the additions to stories should be
accepted or rejected. Users earn reputation points as they help
build stories.

*/

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {configureStore} from '../store';
import AppNavigation from './AppNavigation';
import {setTokenHeader} from '../services/requests';
import {SET_CURRENT_USER} from '../store/types';

//Setting up Redux store
const store = configureStore();

//Check if user is signed in (persistent login)
if (localStorage.jwtToken) {
  try {
    //Try to decode JWT token and check for validity
    const decoded = jwtDecode(localStorage.jwtToken);
    const isValid = (decoded.exp * 1000) - Date.now() > 0;
    const data = (isValid) ? decoded : {};
    const token = (isValid) ? localStorage.jwtToken : null;

    //Set authorization header for API requests
    setTokenHeader(token);
    store.dispatch({type: SET_CURRENT_USER, payload: data});

  } catch (err) {
    //If decoding fails, JWT token may have been tampered with
    //App removes user and clear token
    store.dispatch({type: SET_CURRENT_USER, payload: {}});
    setTokenHeader(null);
    localStorage.clear();
  }
};

//App Component - Setups overall app
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppNavigation/>
        </BrowserRouter>
      </Provider>);
  }
}

//Export
export default App;
