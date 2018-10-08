import Projects from '../_services/projects';
import * as types from './actionTypes';
const loadProjectsSuccess = result => {
  const { projects } = result;
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
};
const loadProjects = () => {
  return dispatch => {
    return Projects.getAll()
      .then(projects => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch(error => {
        throw error;
      });
  };
};

export default loadProjects;
