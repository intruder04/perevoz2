import axios from 'axios';

export function login(data) {
    return dispatch => {
        console.log("logindata - ",data);
        return axios.post('/api/auth', data);
    }
}