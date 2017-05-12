import { combineReducers } from 'redux'
import flashMessages from "./flashMessagesReducer"
import veiStatus from "./veiStatusReducer"

const rootReducer = combineReducers({
    flashMessages,
    veiStatus
})

export default rootReducer