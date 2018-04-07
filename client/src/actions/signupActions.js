import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}

export function isUserExists(identifier) {
    return dispatch => {
        console.log('in isUserExists action');
        return axios.get(`/api/users/${identifier}`);
    }
}