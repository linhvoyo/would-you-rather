import {
  AUTH_USER,
  LOG_OUT,
} from '../actions/types';

export default function authedUser(state = '', action) {
  switch (action.type) {
    case AUTH_USER: return action.id;
    case LOG_OUT: return '';
    default: return state;
  }
}
