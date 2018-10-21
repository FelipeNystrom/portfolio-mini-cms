import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
// import registerServiceWorker from './registerServiceWorker';
import { loadProjects } from './_actions/projectAction';
import auth from './_actions/userAction';
import './_bootstrapLibrary';
const store = configureStore();
store.dispatch(loadProjects());
store.dispatch(auth.CheckUser());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
