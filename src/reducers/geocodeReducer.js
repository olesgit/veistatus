import {LOAD_GEOCODE_SUCCESS} from '../actions/ActionTypes';

const initialState = {
    geocode: {}
};

export default function geocodeReducer(state = initialState, action={})
{

    switch (action.type)
    {

        case LOAD_GEOCODE_SUCCESS:
            return {
                geocode:action.data
        };

        default:
            return state;
    }
}