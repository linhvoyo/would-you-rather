import { combineReducers } from 'redux';
import questions from './questions';
import users from './users';
import authedUser from './authedUser';
import ui from './ui';

export default combineReducers({
  questions,
  users,
  authedUser,
  ui,
});
