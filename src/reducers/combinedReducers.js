import { combineReducers } from 'redux';
import flashMessages from "./flashMessagesReducer";
import login from './loginReducer';
import message from "./messageReducer";
import map from './mapReducer';

const rootReducer = combineReducers({
    login,
    flashMessages,
    message,
    map
});

export default rootReducer;
