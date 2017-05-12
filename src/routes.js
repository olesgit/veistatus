import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { decodeAndValidateToken } from './actions/loginActions'
import AppContainer from './containers/App'
import Startpage from './containers/Sider/Startpage';
import notFoundPage from './components/Layout/notFoundPage'

export const getRoutes = store => {

    function checkToken() {
        decodeAndValidateToken(store.dispatch);
    }

    return (
        <Route path="/" component={AppContainer} onEnter={checkToken}>
            <IndexRoute component={Startpage} />
            <Route path="*" component={notFoundPage} />
        </Route>
    )
};