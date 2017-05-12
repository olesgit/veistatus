import * as types from '../actions/veistatusActions'

const initialState = []

export default function veiStatusReducer(state = initialState, action = {}) { 
    switch (action.type) {
        case types.GET_STREETS_SUCCESS:
            return { ...state, streets: action.payload }

        case types.GET_STREETS_REQUEST:
        case types.GET_STREETS_FAILURE:
            return {};

        case types.PUT_STREET_SUCCESS:
            const index= state.streets.findIndex(x=>x.ID===action.street.ID)
            const copystreets=[...state.streets]
            copystreets.splice(index,1,action.street)
            return { ...state, streets: copystreets }

        case types.POST_STREET_SUCCESS:

            let newstreets = [...state.streets, action.street];
            let allsorted = newstreets
                .sort(function (a, b) {
                    if (a.Gatenavn === null) return -1;
                    return a.Gatenavn.localeCompare(b.Gatenavn);
                });
            return { ...state, streets: allsorted }

        case types.DELETE_STREET_SUCCESS:
            const filter = state.streets.filter(x => x.ID !== action.street.ID)
            return {
                ...state, streets: filter
            }

        default:
            return state;
    }
}
