import { _getQuestions } from '../../api/_DATA';

import {
  GET_QUESTIONS,
  UPDATE_QUESTION_ON_CREATE,
  UPDATE_QUESTION_ON_QUESTION_SAVE,
} from './types';

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

export const handleGetQuestions = () => (dispatch) => _getQuestions()
  .then((questions) => {
    dispatch(getQuestions(questions));
  });
