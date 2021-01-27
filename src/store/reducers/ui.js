import {
  APP_LOADING,
  APP_LOADED,
  ROUTE_CHANGE,
  CREATE_QUESTION_LOADING,
  CREATE_QUESTION_LOADED,
} from '../actions/types';

const initialState = {
  savingQuestion: false,
  creatingQuestion: false,
  appLoading: false,
  routeChange: '',
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case ROUTE_CHANGE: return { ...state, routeChange: action.route };
    case CREATE_QUESTION_LOADED: return { ...state, creatingQuestion: false };
    case CREATE_QUESTION_LOADING: return { ...state, creatingQuestion: true };
    case APP_LOADED: return { ...state, appLoading: false };
    case APP_LOADING: return { ...state, appLoading: true };
    default: return state;
  }
}
