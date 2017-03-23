import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { browserHistory, Router } from 'react-router';
import * as bs from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-theme-bym.css';
import './css/bootstrap-theme-bym-custom.css';
bs.utils.bootstrapUtils.addStyle(bs.Button, 'input-group');
import { getRoutes } from './routes';
import store from './store/store';
import './css/index.css';

const app = document.getElementById('app');
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {getRoutes(store)}
        </Router>
    </Provider>, app
);