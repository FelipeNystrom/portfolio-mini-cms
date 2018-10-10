import Project from '../_services/projects';
import * as types from './actionTypes';

const loadProjectsSuccess = result => {
  const { projects } = result;
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
};

export const loadProjects = () => {
  return dispatch => {
    return Project.GetAll()
      .then(projects => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateProject = (url, methodType, formData) => {
  return dispatch => {
    return Project.UpdateProjectsState(url, methodType, formData)
      .then(projects => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const newProject = (url, methodType, formData) => {
  return dispatch => {
    return Project.UpdateProjectsState(url, methodType, formData)
      .then(projects => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const deleteProject = (url, methodType, formData) => {
  return dispatch => {
    return Project.DeleteProject(url, methodType, formData)
      .then(projects => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch(err => {
        throw err;
      });
  };
};
