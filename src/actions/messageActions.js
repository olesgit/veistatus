import * as types from './ActionTypes';
import messageApi from '../Api_MockData/mockMessagesApi';
// import axios from 'axios';
//import * as api from '../constants/api';
//import { useMock } from "../constants/settings";

export function loadMessagesStart() {
    return { type: types.LOAD_MESSAGES };
}
export function loadMessagesSuccess(messages) {
    return { type: types.LOAD_MESSAGES_SUCCESS, messages };
}
export function loadMessagesFailure(error) {
    return { type: types.LOAD_MESSAGES_FAILURE, error };
}

export function loadMessages() {
    return function (dispatch) {
        //dispatch(loadMessagesStart());
        return messageApi.getAllMessages().then(messages => {
            dispatch(loadMessagesSuccess(messages));
        }).catch(error => {
            throw (error);
        });
    };
}