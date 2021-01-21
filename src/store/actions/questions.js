import { _getQuestions } from '../../api/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';

const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

export const handleGetQuestions = () => (dispatch) => _getQuestions()
  .then((questions) => {
    dispatch(getQuestions(questions));
  });
