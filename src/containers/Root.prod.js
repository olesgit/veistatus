import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { getRoutes } from '../routes'
import { Router } from 'react-router'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history} routes={getRoutes(store)} />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root
