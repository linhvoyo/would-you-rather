import { GET_QUESTIONS, UPDATE_QUESTIONS_ON_QUESTION_SAVE } from '../actions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS: return { ...state, ...action.questions };
    case UPDATE_QUESTIONS_ON_QUESTION_SAVE: return {
      ...state,
      [action.qid]: {
        ...state[action.qid],
        [action.answer]: {
          ...state[action.qid][action.answer],
          votes: state[action.qid][action.answer].votes.concat(action.authedUser),
        },
      },
    };
    default: return state;
  }
}
