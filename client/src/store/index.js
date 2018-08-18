//Redux store
import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Configuring Redux store
export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  );

  return store;
}
