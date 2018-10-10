import * as types from '../_actions/actionTypes';
import initialState from './initialState';

const userReduser = (state = initialState.user, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };
    case types.USER_LOGIN_REQUEST:
      return { loading: true };
    case types.USER_LOGGED_IN:
      return action.user;
    case types.USER_LOGGED_OUT:
      return { loggedOut: true };
    default:
      return state;
  }
};

export default userReduser;
