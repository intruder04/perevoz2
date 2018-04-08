import axios from 'axios';
import { SET_CALLS } from './types';


export function setCalls(calls) {
  return {
    type: SET_CALLS,
    calls
  }
}

export function getCalls() {
  return dispatch => {
    axios.get('/api/calls')
      .then(res => {
        const calls = res.data.calls;
        console.log(calls);
        dispatch(setCalls(calls));
    });
  }
}