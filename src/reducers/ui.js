import { APP_LOADED, APP_LOADING } from '../actions';

const intialState = {
  appLoading: false,
};

export default function ui(state = intialState, action) {
  switch (action.type) {
    case APP_LOADING: return { ...state, appLoading: true };
    case APP_LOADED: return { ...state, appLoading: false };
    default: return state;
  }
}
