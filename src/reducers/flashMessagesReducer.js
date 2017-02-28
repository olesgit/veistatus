import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "../actions/ActionTypes";
import shortid from "shortid";
import findIndex from "lodash/findIndex";

export default (state = [], action = {}) =>
{
    switch (action.type)
    {
        case ADD_FLASH_MESSAGE:
            return [
                {
                    id: shortid.generate(),  // to remove this later from store by id
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state, { id: action.id });
            if (index >= 0)
            {
                return [ // to exclude this message from the store
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;
        default: return state;
    }
}