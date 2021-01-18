import { _getUsers } from '../api/_DATA';

export const AUTHED_USER = 'AUTHED_USER';
export const GET_USERS = 'GET_USERS';

const authedUser = (id) => ({ type: AUTHED_USER, id });

const getUsers = (users) => ({ type: GET_USERS, users });

export const handleAuthUser = (id) => async (dispatch) => {
  const allUsers = await _getUsers();
  if (Object.keys(allUsers).find(id)) dispatch(authedUser(id));
  else alert('Invalid user');
};

export const handleGetUsers = () => (dispatch) => _getUsers()
  .then((users) => { dispatch(getUsers(users)); });
