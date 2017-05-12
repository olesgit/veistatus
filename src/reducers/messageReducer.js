import * as types from '../actions/messageActions'
import { LOCATION_SELECTED } from '../actions/mapActions'

const initialState = {
    step: 'welcome'
}

export default function messagesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOCATION_SELECTED:
            return { ...state, step: 'address-map' }

        case types.GET_CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload }


        case types.MESSAGE_CHANGE_STEP:
            return { ...state, step: action.payload }

        case types.MESSAGE_SUBMIT_SUCCESS:
            return { ...state, step: 'receipt' }

        case types.GET_CATEGORIES_REQUEST:
        case types.GET_CATEGORIES_FAILURE:
        case types.MESSAGE_SUBMIT_REQUEST:
        case types.MESSAGE_SUBMIT_FAILURE:
            return state;

        case types.MESSAGE_ABORT:
        case types.MESSAGE_ACKNOWLEDGE:
            return { step: 'welcome', categories: state.categories, hideWelcome: Date.now() }

        default:
            return state;
    }
}