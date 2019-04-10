import { _getUsers } from "../utils/_DATA";
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_USERS = "GET_USERS";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}

export function handleGetUsers() {
  return dispatch => {
    dispatch(showLoading())
    return _getUsers()
      .then(response => {
        dispatch(getUsers(response));
        dispatch(hideLoading())
      })
      .catch(err => dispatch(hideLoading()));
  };
}
