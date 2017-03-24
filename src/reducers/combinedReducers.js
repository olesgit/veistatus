import { combineReducers } from 'redux';
import flashMessages from "./flashMessagesReducer";
import message from "./messageReducer";
import map from './mapReducer';

const rootReducer = combineReducers({
    flashMessages,
    message,
    map
});

export default rootReducer;
