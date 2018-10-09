import * as types from './actionTypes';
import User from '../_services/user';

const loggedInSuccess = user => {
  return { type: types.USER_LOGGED_IN, user };
};

const loginRequest = user => {
  return { type: types.USER_LOGIN_REQUEST, user };
};

const loggedOutSuccess = () => {
  return { type: types.USER_LOGGED_OUT };
};

const loginFailure = error => {
  return { type: types.USER_LOGIN_FAILURE, error };
};

const registerFailure = error => {
  return { type: types.USER_REGISTER_FAILURE, error };
};

class Auth {
  static register = (username, password, email) => {
    return dispatch => {
      return User.Register(username, password, email)
        .then(newUser => dispatch(loggedInSuccess(newUser)))
        .catch(err => dispatch(registerFailure(err)));
    };
  };

  static checkUser = () => {
    return dispatch => {
      const token = localStorage.getItem('token');

      if (token) {
        return User.Check(token)
          .then(user => {
            if (user.name) {
              dispatch(loggedInSuccess(user));
            }
          })
          .catch(err => {
            throw err;
          });
      } else return dispatch(loggedOutSuccess());
    };
  };

  static login = (username, password) => {
    return dispatch => {
      dispatch(loginRequest(username));
      return User.Login(username, password)
        .then(user => {
          localStorage.setItem('token', user.token);
          const userInfo = {
            name: user.name,
            userId: user.userId,
            posts: user.posts
          };
          dispatch(loggedInSuccess(userInfo));
        })
        .catch(err => loginFailure(err));
    };
  };

  static logout = () => {
    localStorage.removeItem('token');
    return dispatch => {
      dispatch(loggedOutSuccess());
    };
  };
}

export default Auth;
