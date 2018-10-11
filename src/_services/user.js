class User {
  Check(token) {
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

  Login(username, password) {
    const url = `http://localhost:7000/login`;
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
        password: password
      })
    })
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
  }

  Register = (username, password, email) => {
    const url = `http://localhost:7000/register`;
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
        password: password,
        email: email
      })
    })
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
  };

  Logout = id => {};
}

export default new User();
