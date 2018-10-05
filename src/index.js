import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSignInAlt);
library.add(faSignOutAlt);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
