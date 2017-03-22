import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './containers/App'
//import Login from './components/Account/Login'
import StartSideContainer from './containers/Sider/StartSideContainer';
import notFoundPage from './components/Layout/notFoundPage'



export const getRoutes = () => {
    return (
        <Route path="/" component={AppContainer}>
            {/*<IndexRoute component={Login}  />*/}
            <IndexRoute component={StartSideContainer} />
            <Route path="*" component={notFoundPage} />
        </Route>
    )
};