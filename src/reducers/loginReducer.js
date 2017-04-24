import { AUTH_TOKEN_IS_VALID, LOGIN_USER_SUCCESS } from '../actions/loginActions'

export default function messagesReducer(state = {}, action = {}) {
    switch (action.type) {
        case AUTH_TOKEN_IS_VALID:
            return { ...action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...action.payload };

        default:
            return state;
    }
}