import cookie from "react-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import _ from "lodash";
import * as globals from "../constants/Globals"
const queryparser = require("query-string");

const bymcookie = "bymtoken";
const prosessrolleId = "ProsessrolleId"
const prosessrolleRolleId = "ProsessrolleRolleId"

export function loadBymCookie() {
    return cookie.load(bymcookie);
}

export function saveBymCookie(tk) {
    let expiration = new Date(tk.exp * 1000);
    cookie.save(bymcookie, tk.access_token, { path: '/', expires: expiration });
}
export function removeBymCookie() {
    if (bymCookieExists()) {
        cookie.remove(bymcookie, { path: '/' });
    }
}

export function decodeToken() {
    let token = loadBymCookie();
    if (token != null) {
        return jwtDecode(token);
    }
}
export function Username(){
    let token = decodeToken()
    if(token){
        return token['sub']
    }
    return ""
}
export function UserIsBymAdmin() {
    const exists = this.CheckValueExistsInToken(globals.bymelding_admin_roleId)
    //console.log("hallo bymadmin", exists);
    return exists;
}
export function UserIsEntrepreneur() {
    const exists = this.CheckValueExistsInToken(globals.bymelding_entrepreneur_roleId)
    //console.log("hallo entrepreneur", exists);
    return exists;
}
export function UserIsServicedesk() {
    const exists = this.CheckValueExistsInToken(globals.bymelding_servicedesk_roleId)
    //console.log("hallo servicedesk", exists);
    return exists;
}

export function CheckValueExistsInToken(value) {
    let token = this.decodeToken();
    if (token) {
        const pr_id_exists = token[prosessrolleId] ? token[prosessrolleId] === value : false;
        const prr_id_exists = token[prosessrolleRolleId] ? _.includes(token[prosessrolleRolleId] === value) : false;
        return (pr_id_exists || prr_id_exists)
    }
    return false
}
export function AdminForWhichApplication() {
    let decodedToken = this.decodeToken();
    if (decodedToken) {
        //const app = _.findKey(decodedToken, 1);
        const app = this.findKeyInObj(decodedToken, "1");
        return app;
    }
}

export function findKeyInObj(obj, val) {
    let res = "";
    _.map(obj, function (k, v) {
        if (k === val) {
            res = v;
        }
    });
    return res;
}
export function BearerBymToken() {
    let token = loadBymCookie();
    return `Bearer ${token}`;
}

export function bymCookieExists() {
    let token = loadBymCookie();
    return (token != null ? true : false);
}

export function validateToken() {
    if (bymCookieExists()) {
        const token = decodeToken();
        const currentTime = Date.now();
        const notBeforeTime = new Date(token.nbf * 1000);
        const notAfterTime = new Date(token.exp * 1000);
        console.log(notBeforeTime, notAfterTime);
        const expired = notBeforeTime > currentTime || currentTime > notAfterTime;
        if (expired) {
            console.log("Token expired")
            return false;
        }
        console.log("Token is validated")        
        return true;
    }
    else {
        return false;
    }
}

export function SetAuthorizationToken() {
    if (bymCookieExists()) {
        let bearer = BearerBymToken();
        axios.defaults.headers.common['Authorization'] = bearer;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function GetAppNameFromQueryString() {
    const query = queryparser.parse(location.search);
    if (query) {
        return query.appName;
    }

}