import { _saveQuestionAnswer, _saveQuestion } from '../../api/_DATA';
import {
  updateUserOnQuestionSave,
  updateUserOncreate,
  authenticateUser,
} from './users';
import {
  updateQuestionOnQuestionSave,
  updateQuestionOnCreate,
  handleGetQuestions,
  createQuestionLoading,
  createQuestionLoaded,
} from './questions';
import {
  appLoaded,
  appLoading,
} from './ui';

export const saveQuestion = (qid, answer) => (dispatch, getState) => {
  const { authedUser } = getState();
  return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
    dispatch(updateQuestionOnQuestionSave(authedUser, qid, answer));
    dispatch(updateUserOnQuestionSave(authedUser, qid, answer));
  });
};

export const createQuestion = (optionOneText, optionTwoText) => (dispatch, getState) => {
  dispatch(createQuestionLoading());
  const { authedUser: author } = getState();
  return _saveQuestion({ author, optionOneText, optionTwoText })
    .then((res) => {
      dispatch(updateQuestionOnCreate(res));
      dispatch(updateUserOncreate(author, res.id));
    })
    .finally(() => dispatch(createQuestionLoaded()));
};

export const logIn = (id) => (dispatch) => {
  dispatch(appLoading());
  return dispatch(authenticateUser(id))
    .then(async () => { await dispatch(handleGetQuestions()); })
    .finally(() => { dispatch(appLoaded()); });
};
