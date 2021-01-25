import { showLoading, hideLoading } from 'react-redux-loading';
import { _getQuestions } from '../../api/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_QUESTION_ON_QUESTION_SAVE = 'UPDATE_QUESTION_ON_QUESTION_SAVE';
export const UPDATE_QUESTION_ON_CREATE = 'UPDATE_QUESTION_ON_CREATE';

const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

export const updateQuestionOnCreate = (question) => ({
  type: UPDATE_QUESTION_ON_CREATE,
  question,
});

export const updateQuestionOnQuestionSave = (authedUser, qid, answer) => ({
  type: UPDATE_QUESTION_ON_QUESTION_SAVE,
  authedUser,
  qid,
  answer,
});

export const handleGetQuestions = () => (dispatch) => {
  dispatch(showLoading());
  return _getQuestions()
    .then((questions) => {
      dispatch(getQuestions(questions));
      dispatch(hideLoading());
    });
};
