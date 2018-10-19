import { sendToServer } from '../_helpers/projects';
import baseUrl from '../_helpers/api';

const url = `${baseUrl}/getAll`;

class Project {
  GetAll() {
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
