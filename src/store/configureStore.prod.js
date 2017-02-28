import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import combinedReducers from '../reducers/combinedReducers'

const configureStore = preloadedState => createStore(
    combinedReducers,
    preloadedState,
    applyMiddleware(thunk)
)

export default configureStore