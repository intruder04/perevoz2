import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import calls from './reducers/calls';

export default combineReducers({
    flashMessages,
    auth,
    calls
});