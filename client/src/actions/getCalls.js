import axios from 'axios';

export function Calls() {
    return dispatch => {
        console.log('in getCalls action');
        return axios.get('/api/calls');
    }
}