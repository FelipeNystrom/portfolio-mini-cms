import * as types from '../_actions/actionTypes';
import initialState from './initialState';

const projectReducer = (state = initialState.projects, action) => {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return Object.assign([], state, action.projects);
    default:
      return state;
  }
};
export default projectReducer;
