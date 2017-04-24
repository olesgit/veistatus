import axios from 'axios'
import * as api from '../constants/api'
import * as cookieHandler from '../utils/cookieHandler'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

const loginUserRequest = (email) => ({ type: LOGIN_USER_REQUEST, payload: email })
const loginUserSuccess = (user) => ({ type: LOGIN_USER_SUCCESS, payload: user })
const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: error, error: true })

export function login(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest(email));
        return axios.post(api.login, { epost: email, passord: password, serviceId: "1aeffc5d-9d3e-4db9-aead-525a33660b9c" })
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