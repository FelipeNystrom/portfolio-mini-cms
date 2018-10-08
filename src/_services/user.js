export default class User {
  static Check(token) {
    const url = 'http://localhost:7000/admin';
    return fetch(url, {
      method: 'POST',
      headers: {
        authorization: token,
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
  }

  static LoginOrRegister(username, password, formName, email = null) {
    const url = `http://localhost:7000/${formName}`;
    return fetch(url, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
  }
}
