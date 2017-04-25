import { RESET_PASSWORD_SUCCESS } from '../actions/loginActions'
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "../actions/ActionTypes"
import shortid from "shortid"
import findIndex from "lodash/findIndex"

export default (state = [], action = {}) => {
    let index;
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return ([
                {
                    id: shortid.generate(),  // to remove this later from store by id
                    type: action.message.type,
                    text: action.message.text
                }
            ]);

        case DELETE_FLASH_MESSAGE:
            index = findIndex(state, { id: action.id });
            if (index >= 0) {
                return [ // to exclude this message from the store
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;

        case RESET_PASSWORD_SUCCESS:
            return ([
                {
                    id: shortid.generate(),
                    type: 'success',
                    text: "En epost med link for tilbakestilling av passord er sendt"
                }
            ]);

        default: return state;
    }
}