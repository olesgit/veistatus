import axios from 'axios'
import * as api from '../constants/api'
import * as cookieHandler from '../utils/cookieHandler'

const BYM_SERVICE_ID = "1aeffc5d-9d3e-4db9-aead-525a33660b9c";

// Login

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

const loginUserRequest = (email) => ({ type: LOGIN_USER_REQUEST, payload: email })
const loginUserSuccess = (user) => ({ type: LOGIN_USER_SUCCESS, payload: user })
const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: error, error: true })

export function login(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest(email));
        return axios.post(api.login, { epost: email, passord: password, serviceId: BYM_SERVICE_ID })
            .then(response => loginSuccess(response, dispatch))
            .catch(error => loginFailure(error, dispatch));
    };
}

function loginSuccess(response, dispatch) {
    let bymtoken = response.data.result;
    cookieHandler.saveBymCookie(bymtoken);
    cookieHandler.setAuthorizationToken();
    const decodedToken = cookieHandler.decodeToken();
    dispatch(loginUserSuccess(decodedToken))
}

function loginFailure(error, dispatch) {
    dispatch(loginUserFailure(error));
    let message = "Kunne ikke logge inn";
    if (error.response && error.response.data && error.response.data.errorMessage) {
        // Known error messages:
        // "E-post er påkrevd"
        // "E-post er ikke validert"
        // "Passord må være minimum 6 tegn"
        // "E-post eller passord er ikke riktig!"
        message = "Feil e-postadresse eller passord";
    }
    return Promise.reject(message)
}

// Register User

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

const registerUserRequest = (email) => ({ type: REGISTER_USER_REQUEST, payload: email })
const registerUserSuccess = (user) => ({ type: REGISTER_USER_SUCCESS, payload: user })
const registerUserFailure = (error) => ({ type: REGISTER_USER_FAILURE, payload: error, error: true })

export function register(email, password, passwordRepeat, approve) {
    return function (dispatch) {
        dispatch(registerUserRequest(email));
        return axios.post(api.registerUser, { epost: email, passord: password, gjentaPassord: passwordRepeat, godkjenn: approve, serviceId: BYM_SERVICE_ID })
            .then(response => registerSuccess(response, dispatch))
            .catch(error => registerFailure(error, dispatch));
    };
}

function registerSuccess(response, dispatch) {
    let bymtoken = response.data.result;
    cookieHandler.saveBymCookie(bymtoken);
    cookieHandler.setAuthorizationToken();
    const decodedToken = cookieHandler.decodeToken();
    dispatch(registerUserSuccess(decodedToken))
}

function registerFailure(error, dispatch) {
    dispatch(registerUserFailure(error));
    let message = "Kunne ikke logge inn";
    if (error.response && error.response.data && error.response.data.errorMessage) {
        // Known error messages:
        // "E-post er påkrevd"
        // "E-post er ikke validert"
        // "Passord må være minimum 6 tegn"
        // "E-post eller passord er ikke riktig!"
        message = "Feil e-postadresse eller passord";
    }
    return Promise.reject(message)
}

// Change Passord

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'

const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST })
const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS })
const changePasswordFailure = (error) => ({ type: CHANGE_PASSWORD_FAILURE, payload: error, error: true })

export function changePassword(brukerId, password) {
    return function (dispatch) {
        dispatch(changePasswordRequest());
        return axios.put(api.changePassword(brukerId), { passord: password })
            .then(() => dispatch(changePasswordSuccess()))
            .catch(error => changePasswordFailed(error, dispatch));
    };
}

function changePasswordFailed(error, dispatch) {
    dispatch(changePasswordFailure(error));
    let message = "Kunne ikke endre passord";
    if (error.response && error.response.data && error.response.data.errorMessage) {
        if (error.response.data.errorMessage === "Passord må være minimum 6 tegn\r\n") {
            message = "Passord må være på minimum 6 tegn";
        }
    }
    return Promise.reject(message)
}

// Reset Password

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

const resetPasswordRequest = (email) => ({ type: RESET_PASSWORD_REQUEST, payload: email })
const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
const resetPasswordFailure = (error) => ({ type: RESET_PASSWORD_FAILURE, payload: error, error: true })

export function reset(email) {
    return function (dispatch) {
        dispatch(resetPasswordRequest(email));
        return axios.post(api.resetPassword, { epost: email, serviceId: BYM_SERVICE_ID })
            .then(() => dispatch(resetPasswordSuccess()))
            .catch(error => resetFailure(error, dispatch));
    };
}

function resetFailure(error, dispatch) {
    dispatch(resetPasswordFailure(error));
    let message = "Kunne ikke tilbakestille passord";
    if (error.response && error.response.data && error.response.data.errorMessage) {
        message = "Ukjent e-postadresse";
    }
    return Promise.reject(message)
}

// Validate Token
export const AUTH_TOKEN_IS_VALID = 'AUTH_TOKEN_IS_VALID';
export const AUTH_TOKEN_IS_INVALID = 'AUTH_TOKEN_IS_INVALID';
export const AUTH_TOKEN_IS_EXPIRED = 'AUTH_TOKEN_IS_EXPIRED';

const validToken = token => ({ type: AUTH_TOKEN_IS_VALID, payload: token });
const invalidToken = () => ({ type: AUTH_TOKEN_IS_INVALID });
const expiredToken = () => ({ type: AUTH_TOKEN_IS_EXPIRED });

export function decodeAndValidateToken(dispatch) {
    const jwt = cookieHandler.loadBymCookie();
    if (jwt == null) {
        return null;
    }

    const token = cookieHandler.decodeToken(jwt);

    if (token == null) {
        dispatch(invalidToken());
        return null;
    }

    const now = Date.now();
    const notBeforeTime = new Date(token.nbf * 1000);
    const expirationTime = new Date(token.exp * 1000);

    const expired = notBeforeTime > now || now > expirationTime;

    if (expired) {
        dispatch(expiredToken());
        return null;
    }

    dispatch(validToken(token));
    return token;
}