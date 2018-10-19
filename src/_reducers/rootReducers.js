import { combineReducers } from 'redux';
import projects from './projectsReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names: projects insetad of projects: projects
  user,
  projects
});

export default rootReducer;

// const loggedIn = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return 'SUCCESSFULLY_LOGGED_IN';
//     default:
//       return state;
//   }
// };
