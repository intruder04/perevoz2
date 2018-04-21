import { GET_CALLS } from '../actions/types';

const initialState = {
  calls: {}
}

export default function calls(state = [], action = {}) {
  switch(action.type) {
    case GET_CALLS:
      return action.calls;
    default: return state;
  }
}