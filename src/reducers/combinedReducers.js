import { combineReducers } from 'redux'
import flashMessages from "./flashMessagesReducer"
<<<<<<< HEAD
import veiStatus from "./veiStatusReducer"

const rootReducer = combineReducers({
    flashMessages,
    veiStatus
=======
import message from "./messageReducer"
import map from './mapReducer'
import login from './loginReducer'

const rootReducer = combineReducers({
    flashMessages,
    message,
    map,
    login
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
})

export default rootReducer