import { _getQuestions } from '../../api/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_QUESTIONS_ON_QUESTION_SAVE = 'UPDATE_QUESTIONS_ON_QUESTION_SAVE';

const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

export const updateQuestionsOnQuestionSave = (authedUser, qid, answer) => ({
  type: UPDATE_QUESTIONS_ON_QUESTION_SAVE,
  authedUser,
  qid,
  answer,
});

export const handleGetQuestions = () => (dispatch) => _getQuestions()
  .then((questions) => {
    dispatch(getQuestions(questions));
  });
