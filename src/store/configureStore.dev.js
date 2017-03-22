import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import combinedReducers from '../reducers/combinedReducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import * as types from '../actions/ActionTypes'; //for filtering on redux-logger

const configureStore = preloadedState =>
{
    // const store = createStore(
    //     combinedReducers,
    //     preloadedState,
    //     compose(
    //         applyMiddleware(thunk, createLogger(), reduxImmutableStateInvariant())
    //     )
    // )


// //For making chrome redux extension to work. TODO for prod replace these 2 lines with above. 
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     const store = createStore(combinedReducers, preloadedState, composeEnhancers(
//         applyMiddleware(thunk, createLogger(), reduxImmutableStateInvariant())
//     ));

//With filter on redux-logger
//For making chrome redux extension to work. TODO for prod replace these 2 lines with above. 
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combinedReducers, preloadedState, composeEnhancers(
        applyMiddleware(thunk, createLogger( {
  predicate: (getState, action) =>  action.type !== types.BEGIN_AJAX_CALL
                                    && action.type !== types.SET_CURRENT_SERVICE_INFO
                                    && action.type === "SHOW_NOTHING"
}  ), reduxImmutableStateInvariant())
    ));

// //With options set on redux-logger. This will show the indicated loglevel on messages, when displayed in the console
// let optionsObj = {level: 'info'}; //level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level, more options on redux-logger npm 
// //For making chrome redux extension to work. TODO for prod replace these 2 lines with above. 
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     const store = createStore(combinedReducers, preloadedState, composeEnhancers(
//         applyMiddleware(thunk, createLogger(optionsObj), reduxImmutableStateInvariant())
//     ));


    if (module.hot)
    {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/combinedReducers', () =>
        {
            const nextRootReducer = require('../reducers/combinedReducers').default
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}

export default configureStore
