import {
  APP_LOADING,
  APP_LOADED,
  ROUTE_CHANGE,
} from './types';

export const redirectRoute = (route) => ({ type: ROUTE_CHANGE, route });

export const appLoading = () => ({ type: APP_LOADING });

export const appLoaded = () => ({ type: APP_LOADED });
