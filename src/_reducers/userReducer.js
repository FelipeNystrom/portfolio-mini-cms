import * as types from '../_actions/actionTypes';
import initialState from './initialState';

const userReduser = (state = initialState.user, action) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return Object.assign({}, state, action.userInfo);
    default:
      return state;
  }
};

export default userReduser;
