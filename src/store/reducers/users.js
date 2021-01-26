import {
  GET_USERS,
  LOG_OUT,
  UPDATE_USER_ON_QUESTION_SAVE,
  UPDATE_USER_ON_CREATE,
} from '../actions/types';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS: return { ...state, ...action.users };
    case UPDATE_USER_ON_QUESTION_SAVE: return {
      ...state,
      [action.authedUser]: {
        ...state[action.authedUser],
        answers: {
          ...state[action.authedUser].answers,
          [action.qid]: action.answer,
        },
      },
    };
    case UPDATE_USER_ON_CREATE: return {
      ...state,
      [action.author]: {
        ...state[action.author],
        questions: state[action.author].questions.concat(action.id),
      },
    };
    case LOG_OUT: return {};
    default: return state;
  }
}
