import {
  APP_LOADED,
  APP_LOADING,
  SAVING_QUESTION_ANSWER,
  SAVED_QUESTION_ANSWER,
} from '../actions';

const intialState = {
  appLoaded: false,
  savingQuestionAnswer: false,
};

export default function ui(state = intialState, action) {
  switch (action.type) {
    case APP_LOADING: return { ...state, appLoaded: false };
    case APP_LOADED: return { ...state, appLoaded: true };
    case SAVING_QUESTION_ANSWER: return { ...state, savingQuestionAnswer: true };
    case SAVED_QUESTION_ANSWER: return { ...state, savingQuestionAnswer: false };
    default: return state;
  }
}
