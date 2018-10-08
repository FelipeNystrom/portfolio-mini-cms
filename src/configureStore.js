import { createStore, applyMiddleware } from 'redux';
import rootReducers from './_reducers/rootReducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}
