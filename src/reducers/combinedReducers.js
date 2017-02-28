import { combineReducers } from 'redux';
import flashMessages from "./flashMessagesReducer";
import login from './loginReducer';
import messages from "./messagesReducer";


const rootReducer = combineReducers({
    login,
    flashMessages,
    messages
});
export default rootReducer;
