import {combineReducers} from 'redux';
import ReqReducers from './req';
import ActiveReq from './req-active';

const allReducers = combineReducers({
    req : ReqReducers,
    active: ActiveReq
});

export default allReducers;