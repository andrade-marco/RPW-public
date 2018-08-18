//API requests
//Service for dealing with API requests
import axios from 'axios';

//Adds authentication toke to API requests
export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `RPW_Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

//Sets up API requests depending on params from caller
export function makeApiRequest(method, path, data) {
  const url = path;
  return axios[method](url, data);
}

//Process error message sent from server
export function processError(message) {
  return message.split(/Path|\./)
                .filter(val => val.includes('is required'))
                .map(val => val.trim()
                               .replace(/`/g, "")
                               .replace('username', 'Pen name')
                               .replace('email', 'Email')
                               .replace('password', 'Password')
                               .replace('title', 'Title')
                               .replace('genre', 'Genre')
                               .replace('initialText', 'Initial text')
                               .replace('content', 'Text'));
}
