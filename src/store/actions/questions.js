import { showLoading, hideLoading } from 'react-redux-loading';
import { _getQuestions, _saveQuestion } from '../../api/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_QUESTIONS_ON_QUESTION_SAVE = 'UPDATE_QUESTIONS_ON_QUESTION_SAVE';
export const CREATE_QUESTION = 'CREATE_QUESTION';

const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

const createQuestion = (question) => ({ type: CREATE_QUESTION, question });

export const updateQuestionsOnQuestionSave = (authedUser, qid, answer) => ({
  type: UPDATE_QUESTIONS_ON_QUESTION_SAVE,
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

export const handleCreateQuestion = (optionOneText, optionTwoText) => (dispatch, getState) => {
  const { authedUser: author } = getState();
  const question = { author, optionOneText, optionTwoText };
  return _saveQuestion(question).then((res) => {
    dispatch(createQuestion(res));
  });
};
