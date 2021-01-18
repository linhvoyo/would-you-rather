import { handleGetUsers } from './users';
import { handleGetQuestions } from './questions';

export const INIT_APP = 'INIT_APP';

export const initApp = () => (dispatch) => {
  dispatch(handleGetUsers());
  dispatch(handleGetQuestions());
};
