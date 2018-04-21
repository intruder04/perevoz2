import axios from 'axios';
import { GET_CALLS } from './types';


export function getCalls(calls) {
  return {
    type: GET_CALLS,
    calls
  }
}

export function Calls() {
  return dispatch => {
    axios.get('/api/calls')
      .then(res => {
        const calls = res.data.calls;
        console.log("calls from db ",calls);
        dispatch(getCalls(calls));
    }).catch(error => {
      throw(error);
    });
  }
}