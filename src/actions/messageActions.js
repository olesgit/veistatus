import axios from 'axios'
import * as api from '../constants/api'

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE'

export const MESSAGE_SUBMIT_REQUEST = 'MESSAGE_SUBMIT_REQUEST'
export const MESSAGE_SUBMIT_SUCCESS = 'MESSAGE_SUBMIT_SUCCESS'
export const MESSAGE_SUBMIT_FAILURE = 'MESSAGE_SUBMIT_FAILURE'

export const MESSAGE_ABORT = 'MESSAGE_ABORT'
export const MESSAGE_ACKNOWLEDGE = 'MESSAGE_ACKNOWLEDGE'

export const MESSAGE_CHANGE_STEP = 'MESSAGE_CHANGE_STEP'

export function changeStep(nextStep) {
    return {
        type: MESSAGE_CHANGE_STEP,
        payload: nextStep
    };
}

export function abort() {
    return {
        type: MESSAGE_ABORT
    };
}

export function acknowledge() {
    return {
        type: MESSAGE_ACKNOWLEDGE
    }
}

const getCategoriesRequest = () => ({ type: GET_CATEGORIES_REQUEST })
const getCategoriesSuccess = (result) => ({ type: GET_CATEGORIES_SUCCESS, payload: result })
const getCategoriesFailure = () => ({ type: GET_CATEGORIES_FAILURE })

export function getCategories() {
    return function (dispatch) {
        dispatch(getCategoriesRequest());
        return axios.get(api.getMessageCategories)
            .then(response => dispatch(getCategoriesSuccess(response.data.result)))
            .catch(error => dispatch(getCategoriesFailure(error)));
    };
}

function shouldGetCategories(state) {
    return !state.categories;
}

export function getCategoriesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldGetCategories(getState())) {
            return dispatch(getCategories());
        } else {
            return Promise.resolve();
        }
    };
}

const submitMessageRequest = () => ({ type: MESSAGE_SUBMIT_REQUEST })
const submitMessageSuccess = () => ({ type: MESSAGE_SUBMIT_SUCCESS })
const submitMessageFailure = () => ({ type: MESSAGE_SUBMIT_FAILURE })

export function submitMessage(message) {
    return function (dispatch) {
        var form = new FormData();
        appendData(form, "innsenderNavn", message.innsenderNavn);
        appendData(form, "innsenderEpost", message.innsenderEpost);
        appendData(form, "meldingstypeId", message.meldingstypeId);
        appendData(form, "beskrivelse", message.beskrivelse);
        appendData(form, "adresse", message.adresse);
        appendData(form, "latitude", message.latitude);
        appendData(form, "longitude", message.longitude);
        message.bilder.forEach(bilde => form.append("bilder", bilde));

        dispatch(submitMessageRequest());
        return axios.post(api.postMessage, form)
            .then(response => dispatch(submitMessageSuccess(response)))
            .catch(error => dispatch(submitMessageFailure(error)));
    };
}

function appendData(form, key, value) {
    if (value != null) {
        form.append(key, value);
    }
}