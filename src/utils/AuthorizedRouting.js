import * as cookieHandler from "./cookieHandler";
import _ from "lodash";
import * as routes from "../constants/clientRoutes"
//import { browserHistory } from "react-router";


export function checkToken(nextState, replaceState)
{
    const jwt = cookieHandler.validateToken();
    
    if (!jwt)
    {
        console.log("ikke token")
        return replaceState({ pathname: '/' })
    }
}


export function checkAuthorizedRoles(nextState, replaceState)
{
    let publicRoutes=[routes.login, routes.home]
    let adminRoutes = [routes.selskaper, routes.kontrakter, routes.brukere, routes.prosessKodeSkjema, routes.serviceAvdelingen,routes.meldinger]
    let entrepreneurRoutes = [routes.meldinger]

    let pathname = nextState.location.pathname;
    const jwt = cookieHandler.validateToken();
    const entrepreneur = cookieHandler.UserIsEntrepreneur();
    const bymadmin = cookieHandler.UserIsBymAdmin()
    const serviceAvdeling = cookieHandler.UserIsServicedesk();
    if (jwt)
    {
        if (entrepreneur || serviceAvdeling)
        {
            if (!_.includes(entrepreneurRoutes, pathname))
            {
                return replaceState(routes.meldinger);
            }
        }
        else if (bymadmin)
        {
            if (!_.includes(adminRoutes, pathname))
            {
                return replaceState(routes.selskaper);
            }
        }
    }
    else
    {
        if (!_.includes(publicRoutes, pathname))
        {
            return replaceState('/');
        }
    }
}