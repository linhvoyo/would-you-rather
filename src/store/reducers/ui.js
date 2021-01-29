import {
  APP_LOADING,
  APP_LOADED,
  CREATE_QUESTION_LOADING,
  CREATE_QUESTION_LOADED,
  SAVE_QUESTION_LOADED,
  SAVE_QUESTION_LOADING,
} from '../actions/types';

const initialState = {
  savingQuestion: false,
  creatingQuestion: false,
  appLoading: false,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case APP_LOADED: return { ...state, appLoading: false };
    case APP_LOADING: return { ...state, appLoading: true };
    case CREATE_QUESTION_LOADED: return { ...state, creatingQuestion: false };
    case CREATE_QUESTION_LOADING: return { ...state, creatingQuestion: true };
    case SAVE_QUESTION_LOADED: return { ...state, savingQuestion: false };
    case SAVE_QUESTION_LOADING: return { ...state, savingQuestion: true };
    default: return state;
  }
}
