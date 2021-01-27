import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import questions from './questions';
import users from './users';
import authedUser from './authedUser';
import route from './route';

export default combineReducers({
  questions,
  users,
  authedUser,
  route,
  loadingBar: loadingBarReducer,
});
