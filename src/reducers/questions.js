import { GET_QUESTIONS } from '../actions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS: return { ...state, ...action.questions };
    default: return state;
  }
}
