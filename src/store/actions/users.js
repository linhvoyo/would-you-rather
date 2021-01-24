import { _getUsers } from '../../api/_DATA';

export const AUTH_USER = 'AUTH_USER';
export const GET_USERS = 'GET_USERS';
export const UPDATE_USERS_ON_QUESTION_SAVE = 'UPDATE_USERS_ON_QUESTION_SAVE';

const authenticatedUser = (id) => ({ type: AUTH_USER, id });

const getUsers = (users) => ({ type: GET_USERS, users });

export const updateUsersOnQuestionSave = (authedUser, qid, answer) => ({
  type: UPDATE_USERS_ON_QUESTION_SAVE,
  authedUser,
  qid,
  answer,
});

const TEMP_USER = 'johndoe';

export const authenticateUser = (id = TEMP_USER) => (dispatch) => _getUsers()
  .then((users) => {
    if (Object.keys(users).find((user) => user === id)) dispatch(authenticatedUser(id));
    else throw Error('Invalid user');
  }).catch((e) => alert(e));

export const handleGetUsers = () => (dispatch) => _getUsers()
  .then((users) => { dispatch(getUsers(users)); });
