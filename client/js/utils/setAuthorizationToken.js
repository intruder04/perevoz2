import axios from 'axios';

export default function setAuthorizationToken(token){
    if (token) {
        // console.log('Setting auth token in header');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // console.log('Removing auth token from header');
        delete axios.defaults.headers.common['Authorization'];
    }
}