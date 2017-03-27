import { combineReducers } from 'redux'
import flashMessages from "./flashMessagesReducer"
import message from "./messageReducer"

const rootReducer = combineReducers({
    flashMessages,
    message
});

export default rootReducer;
