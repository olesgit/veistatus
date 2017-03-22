import * as types from '../actions/messageActions'
import { LOCATION_SELECTED } from '../actions/mapActions'

const initialState = {
    step: 'welcome'
}

export default function messagesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.MESSAGE_ADDRESS_SPECIFIED:
            return update(state, action, 'address', 'category')
        case types.MESSAGE_CATEGORY_SPECIFIED:
            return update(state, action, 'category', 'picture')
        case types.MESSAGE_PICTURE_SPECIFIED:
            return update(state, action, 'picture', 'description')
        case types.MESSAGE_DESCRIPTION_SPECIFIED:
            return update(state, action, 'description', 'submit')

        case LOCATION_SELECTED:
            return { ...state, step: 'address' }

        // TODO
        case types.MESSAGE_SUBMIT_REQUEST:
            return state;
        case types.MESSAGE_SUBMIT_SUCCESS:
            return state;
        case types.MESSAGE_SUBMIT_FAILURE:
            return state;

        default:
            return state;
    }
}

function update(state, action, currentStep, nextStep) {
    return {
        ...state,
        [currentStep]: action.payload,
        step: nextStep
    }
}