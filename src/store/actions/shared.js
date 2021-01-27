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
} from './questions';

export const saveQuestion = (qid, answer) => (dispatch, getState) => {
  const { authedUser } = getState();
  return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
    dispatch(updateQuestionOnQuestionSave(authedUser, qid, answer));
    dispatch(updateUserOnQuestionSave(authedUser, qid, answer));
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

export const logIn = (id) => async (dispatch) => dispatch(authenticateUser(id))
  .then(() => { dispatch(handleGetQuestions()); });
