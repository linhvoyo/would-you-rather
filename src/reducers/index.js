import { combineReducers } from 'redux';
import questions from './questions';
import users from './users';
import ui from './ui';

export default combineReducers({
  questions,
  users,
  ui,
});
