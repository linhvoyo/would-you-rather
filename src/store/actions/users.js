import { _getUsers } from '../../api/_DATA';

import {
  AUTH_USER,
  LOG_OUT,
  GET_USERS,
  UPDATE_USER_ON_CREATE,
  UPDATE_USER_ON_QUESTION_SAVE,
} from './types';

const authenticatedUser = (id) => ({ type: AUTH_USER, id });
const getUsers = (users) => ({ type: GET_USERS, users });

export const logOut = () => ({ type: LOG_OUT });

export const updateUserOnQuestionSave = (authedUser, qid, answer) => ({
  type: UPDATE_USER_ON_QUESTION_SAVE,
  authedUser,
  qid,
  answer,
});

export const updateUserOncreate = (author, id) => ({
  type: UPDATE_USER_ON_CREATE,
  author,
  id,
});

const TEMP_USER = 'johndoe';

export const authenticateUser = (id = TEMP_USER) => (dispatch) => _getUsers()
  .then((users) => {
    if (Object.keys(users).find((user) => user === id)) dispatch(authenticatedUser(id));
    else throw Error('Invalid user');
  }).catch((e) => alert(e));

export const handleGetUsers = () => (dispatch) => _getUsers()
  .then((users) => {
    dispatch(getUsers(users));
  });
