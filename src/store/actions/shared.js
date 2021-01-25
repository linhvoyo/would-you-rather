import { showLoading, hideLoading } from 'react-redux-loading';

import { _saveQuestionAnswer, _saveQuestion } from '../../api/_DATA';
import {
  handleGetUsers,
  updateUserOnQuestionSave,
  updateUserOncreate,
} from './users';
import {
  handleGetQuestions,
  updateQuestionOnQuestionSave,
  updateQuestionOnCreate,
} from './questions';

export const APP_LOADING = 'APP_LOADING';
export const APP_LOADED = 'APP_LOADED';
export const SAVING_QUESTION_ANSWER = 'SAVING_QUESTION_ANSWER';
export const SAVED_QUESTION_ANSWER = 'SAVED_QUESTION_ANSWER';

const appLoading = () => ({ type: APP_LOADING });

const appLoaded = () => ({ type: APP_LOADED });

const savingQuestionAnswer = () => ({ type: SAVING_QUESTION_ANSWER });

const savedQuestionAnswer = () => ({ type: SAVED_QUESTION_ANSWER });

export const initApp = () => async (dispatch) => {
  dispatch(showLoading());
  dispatch(appLoading());
  await dispatch(handleGetUsers());
  await dispatch(handleGetQuestions());
  dispatch(hideLoading());
  dispatch(appLoaded());
};

export const saveQuestion = (qid, answer) => (dispatch, getState) => {
  dispatch(savingQuestionAnswer());
  const { authedUser } = getState();
  return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
    dispatch(updateQuestionOnQuestionSave(authedUser, qid, answer));
    dispatch(updateUserOnQuestionSave(authedUser, qid, answer));
    dispatch(savedQuestionAnswer());
  });
};

export const createQuestion = (optionOneText, optionTwoText) => (dispatch, getState) => {
  const { authedUser: author } = getState();
  return _saveQuestion({ author, optionOneText, optionTwoText })
    .then((res) => {
      dispatch(updateQuestionOnCreate(res));
      dispatch(updateUserOncreate(author, res.id));
    });
};
