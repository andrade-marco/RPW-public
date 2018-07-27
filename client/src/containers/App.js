//App
import React, {Component} from 'react';
// import jwtDecode from 'jwt-decode';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {configureStore} from '../store';
import AppNavigation from './AppNavigation';
import {setTokenHeader} from '../services/requests';
import {SET_CURRENT_USER} from '../store/types';

//Setting up store
const store = configureStore();

if (localStorage.jwtToken) {
  try {
    const decoded = jwtDecode(localStorage.jwtToken);
    const isValid = (decoded.exp * 1000) - Date.now() > 0;
    const data = (isValid) ? decoded : {};
    const token = (isValid) ? localStorage.jwtToken : null;

    setTokenHeader(token);
    store.dispatch({type: SET_CURRENT_USER, payload: data});
    
  } catch (err) {
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

export default App;
