import cookie from "react-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";

const BYM_COOKIE_KEY = "bymelding_token";

export function loadBymCookie() {
    return cookie.load(BYM_COOKIE_KEY);
}

export function saveBymCookie(tk) {
    const expirationDate = new Date(tk.exp * 1000);
    cookie.save(BYM_COOKIE_KEY, tk.access_token, { path: '/', expires: expirationDate });
}

export function removeBymCookie() {
    cookie.remove(BYM_COOKIE_KEY, { path: '/' });
}

export function decodeToken() {
    const token = loadBymCookie();
    if (token != null) {
        return jwtDecode(token);
    }
}

export function validateToken() {
    const token = decodeToken();
    if (token) {
        const currentTime = Date.now();
        const notBeforeTime = new Date(token.nbf * 1000);
        const notAfterTime = new Date(token.exp * 1000);
        const expired = notBeforeTime > currentTime || currentTime > notAfterTime;
        if (!expired) {
            return true;
        }
        console.log("Token expired");
    }

    return false;
}

export function setAuthorizationToken() {
    const token = loadBymCookie();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}