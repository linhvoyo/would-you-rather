import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import questions from './questions';
import users from './users';
import authedUser from './authedUser';
import ui from './ui';

export default combineReducers({
  questions,
  users,
  authedUser,
  ui,
  loadingBar: loadingBarReducer,
});
