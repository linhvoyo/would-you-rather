import { AUTH_USER } from '../actions';

export default function authedUser(state = '', action) {
  switch (action.type) {
    case AUTH_USER: return action.id;
    default: return state;
  }
}
