import * as types from '../actions/messageActions'

const initialState = {}

export default function messagesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload }

        case types.GET_CATEGORIES_REQUEST:
        case types.GET_CATEGORIES_FAILURE:
        case types.MESSAGE_SUBMIT_REQUEST:
        case types.MESSAGE_SUBMIT_SUCCESS:
        case types.MESSAGE_SUBMIT_FAILURE:
            return state;

        default:
            return state;
    }
}