import { _getUsers } from '../../api/_DATA';

export const AUTH_USER = 'AUTH_USER';
export const GET_USERS = 'GET_USERS';

const authedUser = (id) => ({ type: AUTH_USER, id });

const getUsers = (users) => ({ type: GET_USERS, users });

const TEMP_USER = 'johndoe';

export const authenticateUser = (id = TEMP_USER) => (dispatch) => _getUsers()
  .then((users) => {
    if (Object.keys(users).find((user) => user === id)) dispatch(authedUser(id));
    else throw Error('Invalid user');
  }).catch((e) => alert(e));

export const handleGetUsers = () => (dispatch) => _getUsers()
  .then((users) => { dispatch(getUsers(users)); });
