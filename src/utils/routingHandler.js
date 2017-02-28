import React, { Component, PropTypes } from 'react';
//import * as cookieHandler from "./cookieHandler";
import _ from "lodash";
//import { browserHistory } from "react-router";

/**
export default function routingHandler(nextState, replaceState)
{
    let routes = [ '/konto/logginn', '/konto/glemtpassord', '/',
      , '/konto/endretpassord', '/konto/linkforglemtpassord',
        '/konto/nyttpassord'
    ]
    let validAdminRoutes = ['/brukere/admin' ]
    let validSARoutes = [ '/entrepreneurs']

    let pathname = nextState.location.pathname;
    console.log(nextState);
    console.log(pathname);
    const jwt = cookieHandler.validateToken();
    const isAdm = cookieHandler.IsUserAdmin();
    const isSa = cookieHandler.IsUserSuperAdmin();
    if (jwt)
    {
        if (isAdm)
        {
            // browserHistory.push("/brukere/admin");
            if (!_.includes(validAdminRoutes, pathname))
            {
                replaceState('/brukere/admin');
            }
        }
        else if (isSa)
        {
            if (!_.includes(validSARoutes, pathname))
            {
                replaceState('/brukere/sa');
            }
        }
    }
    else
    {
        if (!_.includes(routes, pathname))
        {
            replaceState('/konto/logginn');
        }
    }
}
**/