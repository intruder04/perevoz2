import { GET_CALLS } from '../actions/types';

export default function calls(state = [], action = {}) {
  switch(action.type) {
    case GET_CALLS:
      return action.calls;
    default: return state;
  }
}