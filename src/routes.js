import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './containers/App'
import Login from './components/Account/Login'
import MeldingsContainer from './containers/Meldinger/MeldingsContainer';
import KombinertMeldingsContainer from './containers/Meldinger/KombinertMeldingsContainer';
//import BymBootstrap from './components/Layout/BymBootstrap';
import notFoundPage from './components/Layout/notFoundPage'

import * as routes from './constants/clientRoutes';
// import * as authorize from "./utils/AuthorizedRouting"


export const getRoutes = store =>
{
       return (
        <Route path="/" component={AppContainer}>
            {/*<IndexRoute component={Login}  />*/}
            <IndexRoute component={KombinertMeldingsContainer}  />
            <Route path="meldingsliste" component={MeldingsContainer} />
            <Route path={routes.meldinger} component={KombinertMeldingsContainer} />
            {/*<Route path="design" component={BymBootstrap} />*/}
            <Route path="*" component={notFoundPage} />
        </Route>
    )
};