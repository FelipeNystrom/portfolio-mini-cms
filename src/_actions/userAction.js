import * as types from './actionTypes';
import user from '../_services/user';

const loggedInSuccess = user => {
  return { type: types.USER_LOGGED_IN, user };
};

const loginRequest = () => {
  return { type: types.USER_LOGIN_REQUEST };
};

const registerRequest = () => {
  return { type: types.USER_REGISTER_REQUEST };
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
  Register = (username, password, email) => {
    return dispatch => {
      dispatch(registerRequest());
      return user
        .Register(username, password, email)
        .then(newUser => {
          console.log(newUser);
          localStorage.setItem('token', newUser.token);
          dispatch(loggedInSuccess({ name: newUser.user }));
        })
        .catch(err => dispatch(registerFailure(err)));
    };
  };

  CheckUser = () => {
    return dispatch => {
      const token = localStorage.getItem('token');

      if (token) {
        return user
          .Check(token)
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

  Login = (username, password) => {
    return dispatch => {
      dispatch(loginRequest(username));
      return user
        .Login(username, password)
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

  Logout = () => {
    localStorage.removeItem('token');
    return dispatch => {
      dispatch(loggedOutSuccess());
    };
  };
}

export default new Auth();
