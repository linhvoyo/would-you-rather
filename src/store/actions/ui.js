import {
  APP_LOADING,
  APP_LOADED,
  CREATE_QUESTION_LOADED,
  CREATE_QUESTION_LOADING,
  SAVE_QUESTION_LOADED,
  SAVE_QUESTION_LOADING,
} from './types';

export const appLoading = () => ({ type: APP_LOADING });

export const appLoaded = () => ({ type: APP_LOADED });

export const saveQuestionLoading = () => ({ type: SAVE_QUESTION_LOADING });

export const saveQuestionLoaded = () => ({ type: SAVE_QUESTION_LOADED });

export const createQuestionLoading = () => ({ type: CREATE_QUESTION_LOADING });

export const createQuestionLoaded = () => ({ type: CREATE_QUESTION_LOADED });
