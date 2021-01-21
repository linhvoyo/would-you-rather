import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import questions from './questions';
import users from './users';
import ui from './ui';
import authedUser from './authedUser';

export default combineReducers({
  questions,
  users,
  ui,
  authedUser,
  loadingBar: loadingBarReducer,
});
