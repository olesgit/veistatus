import { combineReducers } from 'redux';
import flashMessages from "./flashMessagesReducer";
import login from './loginReducer';
import messages from "./messagesReducer";
import geocode from "./geocodeReducer";


const rootReducer = combineReducers({
    login,
    flashMessages,
    messages,
    geocode
});
export default rootReducer;
