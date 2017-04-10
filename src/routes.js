import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './containers/App'
import Startpage from './containers/Sider/Startpage';
import notFoundPage from './components/Layout/notFoundPage'

export const getRoutes = () => {
    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute component={Startpage} />
            <Route path="*" component={notFoundPage} />
        </Route>
    )
};