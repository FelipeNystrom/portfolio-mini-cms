import * as types from './actionTypes';
import User from '../_services/user';

const loadUserSucess = userInfo => {
  return { type: types.LOAD_USER_SUCCESS, userInfo };
};

const checkUser = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
      return User.Check(token)
        .then(res => {
          if (res.name) {
            dispatch(loadUserSucess(res));
          }
        })
        .catch(err => {
          throw err;
        });
    } else return { message: 'no token found try to login' };
  };
};
export default checkUser;
