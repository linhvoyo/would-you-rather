import { ROUTE_CHANGE } from '../actions/types';

export default function route(state = '/', action) {
  switch (action.type) {
    case ROUTE_CHANGE: return action.route;
    default: return state;
  }
}
