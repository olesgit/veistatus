import * as cookieHandler from '../utils/cookieHandler';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import * as api from "../constants/api";
import * as utils from "../utils/utils";


import {
    SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, LOGOUT_USER,
    AUTH_TOKEN_IS_VALID, AUTH_TOKEN_IS_INVALID, AUTH_TOKEN_IS_EXPIRED, SET_CURRENT_SERVICE_INFO
} from "./ActionTypes";

const signInUserRequest = (user) => ({ type: SIGNIN_USER, payload: user });
const signInUserFailure = (error) => ({ type: SIGNIN_USER_FAILURE, error: error });

export function GetAuthenticationServiceInfo() {
    let url = api.AuthenticationServiceInfo;
    return dispatch => {
        return axios.get(url).then(res => {
            const service = utils.successData(res)
            dispatch(setCurrentServiceInfo(service))
        })
    }
}

export function loginUser(user) {
    console.log(user)
    return dispatch => {
        let url = api.loginApi()
        dispatch(signInUserRequest(user.epost));
        return axios.post(url, user)
            .then(res => {
                let bymtoken = utils.successData(res);
                if (bymtoken) {
                    cookieHandler.saveBymCookie(bymtoken);
                    cookieHandler.setAuthorizationToken();
                    const decodedToken = cookieHandler.decodeToken();
                    dispatch(signInUserSuccess(decodedToken));
                }
                else {
                    let error = utils.errorData(res)
                    dispatch(signInUserFailure(error));
                }
            })
    };
}

const logoutUser = (userName) => ({ type: LOGOUT_USER, user: userName });

export function signOutAndRemoveCookie(userName) {
    return function (dispatch) {
        dispatch(logoutUser(userName));
        cookieHandler.removeBymCookie();
        browserHistory.push('/login');
    };
}

const validToken = token => ({ type: AUTH_TOKEN_IS_VALID, payload: token });
const invalidToken = () => ({ type: AUTH_TOKEN_IS_INVALID });
const expiredToken = () => ({ type: AUTH_TOKEN_IS_EXPIRED });

export function decodeAndValidateToken(dispatch) {

    const jwt = cookieHandler.loadBymCookie();

    if (jwt == null) {
        return null;
    }

    const token = decodeToken(jwt);

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

    cookieHandler.setAuthorizationToken();

    dispatch(validToken(token));
    return token;
}

function decodeToken(jwt) {
    if (jwt) {
        try {
            return jwtDecode(jwt);
        } catch (err) {
            // Decoding error, invalid/malformed token
        }
    }
}
export function setCurrentServiceInfo(service) {
    return {
        type: SET_CURRENT_SERVICE_INFO,
        service
    };
}
export function signInUserSuccess(user) {
    return {
        type: SIGNIN_USER_SUCCESS,
        user
    };
}
