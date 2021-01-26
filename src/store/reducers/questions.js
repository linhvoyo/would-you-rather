import {
  GET_QUESTIONS,
  LOG_OUT,
  UPDATE_QUESTION_ON_CREATE,
  UPDATE_QUESTION_ON_QUESTION_SAVE,
} from '../actions/types';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS: return { ...state, ...action.questions };
    case UPDATE_QUESTION_ON_CREATE: return {
      ...state,
      [action.question.id]: { ...action.question },
    };
    case UPDATE_QUESTION_ON_QUESTION_SAVE: return {
      ...state,
      [action.qid]: {
        ...state[action.qid],
        [action.answer]: {
          ...state[action.qid][action.answer],
          votes: state[action.qid][action.answer].votes.concat(action.authedUser),
        },
      },
    };
    case LOG_OUT: return {};
    default: return state;
  }
}
