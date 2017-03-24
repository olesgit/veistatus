import * as types from "../actions/mapActions"
import { MESSAGE_ABORT, MESSAGE_ACKNOWLEDGE } from '../actions/messageActions'

export default function messagesReducer(state = {}, action = {}) {
    switch (action.type) {
        case types.LOCATION_SELECTED:
            return { geodata: action.payload };

        case MESSAGE_ACKNOWLEDGE:
        case MESSAGE_ABORT:
            return {}

        default:
            return state;
    }
}