import { combineReducers } from 'redux'
import flashMessages from "./flashMessagesReducer"
import message from "./messageReducer"
import map from './mapReducer'
import login from './loginReducer'

const rootReducer = combineReducers({
    flashMessages,
    message,
    map,
    login
})

export default rootReducer