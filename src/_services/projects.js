import { sendToServer } from '../_helpers/projects';

export default class Project {
  static GetAll() {
    const url = 'http://localhost:7000/';
    return fetch(url)
      .then(res => res.json())
      .catch(err => {
        return err;
      });
  }

  static UpdateProjectsState(url, methodType, formData) {
    return sendToServer(url, methodType, formData).then(this.GetAll());
  }

  static DeleteProject(url, methodType, formData) {
    return sendToServer(url, methodType, formData).then(this.GetAll());
  }
}
