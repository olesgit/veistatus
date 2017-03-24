import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './containers/App'
import StartSideContainer from './containers/Sider/StartSideContainer';
import notFoundPage from './components/Layout/notFoundPage'

export const getRoutes = () => {
    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute component={StartSideContainer} />
            <Route path="*" component={notFoundPage} />
        </Route>
    )
};