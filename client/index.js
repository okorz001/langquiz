'use strict'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import {SET_ANSWER} from './actionTypes'
import {setLang} from './actions'
import reducer from './reducers'
import App from './components/App'

const middlewares = [thunk]

if (process.env.NODE_ENV != 'production') {
    const logger = createLogger({
        // SET_ANSWER is very noisy
        predicate: (getState, action) => action.type != SET_ANSWER,
    })
    // logger must be last
    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

// load a language
store.dispatch(setLang('en', 'vi'))

document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('app')
    render(app, mount)
})
