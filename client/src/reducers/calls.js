import { SET_CALLS } from '../actions/types';

export default function calls(state = [], action = {}) {
  switch(action.type) {
    case SET_CALLS:
      return action.calls;
    default: return state;
  }
}