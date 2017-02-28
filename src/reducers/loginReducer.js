import {SIGNIN_USER_SUCCESS,LOGOUT_USER,AUTH_TOKEN_IS_VALID} from '../actions/ActionTypes';

const initialState = {
    user: {},
    token:{}
};

export default function loginReducer(state = initialState, action={})
{

    switch (action.type)
    {

        case SIGNIN_USER_SUCCESS:
            return {
                user:action.user
        };
        case LOGOUT_USER:
            return {};

        case AUTH_TOKEN_IS_VALID:        
            return {
                token:action.payload                   
        };
        default:
            return state;
    }
}