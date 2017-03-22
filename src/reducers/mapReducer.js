import * as types from "../actions/mapActions"

export default function messagesReducer(state = {}, action = {}) {
    switch (action.type) {
        case types.LOCATION_SELECTED:
            return { geodata: action.payload };

        default:
            return state;
    }
}