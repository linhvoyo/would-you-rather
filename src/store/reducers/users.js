import { GET_USERS, UPDATE_USERS_ON_QUESTION_SAVE } from '../actions';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS: return { ...state, ...action.users };
    case UPDATE_USERS_ON_QUESTION_SAVE: return {
      ...state,
      [action.authedUser]: {
        ...state[action.authedUser],
        answers: {
          ...state[action.authedUser].answers,
          [action.qid]: action.answer,
        },
      },
    };
    default: return state;
  }
}
