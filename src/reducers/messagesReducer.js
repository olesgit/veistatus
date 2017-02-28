import * as types from "../actions/ActionTypes"

const initialState = {
    messages: []
}

export default function messagesReducer(state = initialState, action = {})
{
    switch (action.type)
    {
        case types.LOAD_MESSAGES_SUCCESS:
            return {
                messages: action.messages
            }
        default:
            return state;
    }
}