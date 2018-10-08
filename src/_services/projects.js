export default class Projects {
  static getAll() {
    const url = 'http://localhost:7000/';
    return fetch(url)
      .then(res => res.json())
      .catch(err => {
        return err;
      });
  }
}
