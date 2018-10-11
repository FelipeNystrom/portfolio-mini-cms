import { sendToServer } from '../_helpers/projects';

class Project {
  GetAll() {
    const url = 'http://localhost:7000/';
    return fetch(url)
      .then(res => res.json())
      .catch(err => {
        return err;
      });
  }

  UpdateState(url, methodType, formData) {
    return sendToServer(url, methodType, formData).then(this.GetAll());
  }

  Delete(url, methodType, formData) {
    return sendToServer(url, methodType, formData).then(this.GetAll());
  }
}

export default new Project();
