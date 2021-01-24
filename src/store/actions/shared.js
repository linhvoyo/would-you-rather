import { showLoading, hideLoading } from 'react-redux-loading';

import { handleGetUsers } from './users';
import { handleGetQuestions } from './questions';

export const APP_LOADING = 'APP_LOADING';
export const APP_LOADED = 'APP_LOADED';

const appLoading = () => ({ type: APP_LOADING });

const appLoaded = () => ({ type: APP_LOADED });

export const initApp = () => async (dispatch) => {
  dispatch(showLoading());
  dispatch(appLoading());
  await dispatch(handleGetUsers());
  await dispatch(handleGetQuestions());
  dispatch(hideLoading());
  dispatch(appLoaded());
};
