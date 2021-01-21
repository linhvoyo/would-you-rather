import { APP_LOADED, APP_LOADING } from '../actions';

const intialState = {
  appLoaded: false,
};

export default function ui(state = intialState, action) {
  switch (action.type) {
    case APP_LOADING: return { ...state, appLoaded: false };
    case APP_LOADED: return { ...state, appLoaded: true };
    default: return state;
  }
}
