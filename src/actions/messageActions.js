import axios from 'axios'
import * as api from '../constants/api'
import { addFlashMessage } from './FlashMessagesAction'

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

        // Send anonymous user if user is not logged in
        const config = {};
        if (!axios.defaults.headers.common['Authorization']) {
            config.headers = { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCWU0iLCJpYXQiOjE0OTM4OTM3MzMsImV4cCI6MTUyNTQyOTczMywiYXVkIjoiQllNSW5leCIsInN1YiI6IkFub255bSBwdWJsaWt1bXNicnVrZXIiLCJicnVrZXJJZCI6IjVjNzZlZDQwLTIwMDktNDJlZi1hZmNiLTU5YTAxZjIzZjkzNSIsIlNlcnZpY2VJZCI6IjU5ZmZhY2U1LWM3NmMtNDQ2Yy1iYjU4LTE1YjExMDU3OGE4NyIsIlByb3Nlc3Nyb2xsZUlkIjoiMjY0NzdkYjAtZDA2Zi00ZTI0LTgzMzUtOTk2YmFhOGFiYjQ3IiwiUHJvc2Vzc3JvbGxlUm9sbGVJZCI6IltdIiwibmJmIjoiMTQ5Mzg5MzczMyIsImp0aSI6IjVhZTk0MGIyLTZkZjQtNDRmZS1hMjljLTY4ODhkYTg0YTIxMCJ9.VvHw1nk45Fqa42Qm0A1ExRCQ00KvYbF3y5bIDLO2SHk' };
        }

        return axios.post(api.postMessage, form, config)
            .then(response => dispatch(submitMessageSuccess(response)))
            .catch(error => submitMessageFailed(error, dispatch));
    };
}

function submitMessageFailed(error, dispatch) {
    dispatch(submitMessageFailure(error));
    let message = "En feil oppstod, vennligst prøv på nytt senere";
    if (error.response && error.response.data && error.response.data.errorMessage) {
        const errorMessage = error.response.data.errorMessage;
        // Known error messages:
        // "E-post er påkrevd"
        // "E-post er ikke validert"
        // "Passord må være minimum 6 tegn"
        // "E-post eller passord er ikke riktig!"
        if (errorMessage === "'Beskrivelse' must be between 5 and 2000 characters. You entered 3 characters.\r\n") {
            message = "Beskrivelsen må være på minst 5 bokstaver.\r\nVennligst prøv på nytt.";
        }
    }
    dispatch(addFlashMessage({ type: 'error', text: message }));
    return Promise.reject(message);
}

function appendData(form, key, value) {
    if (value != null) {
        form.append(key, value);
    }
}