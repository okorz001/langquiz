import {combineReducers} from 'redux'

import * as actionTypes from '../actionTypes'

const INITIAL_ACTIVE = {
    word: {
        id: 0,
        native: '',
        foreign: '',
    },
    answer: '',
    results: [],
}

const active = (state = INITIAL_ACTIVE, action) => {
    switch (action.type) {
        case actionTypes.SET_LANGUAGE:
            return Object.assign({}, state, {
                native: action.native,
                foreign: action.foreign,
                key: action.key,
            })
        case actionTypes.SET_QUESTION:
            return Object.assign({}, state, {
                word: action.word,
                answer: '',
            })
        case actionTypes.SET_ANSWER:
            return Object.assign({}, state, {
                answer: action.answer,
            })
        case actionTypes.SUBMIT_ANSWER:
            const result = {
                question: action.question,
                answer: action.answer,
                correct: action.correct,
            }
            // Prepend new result to front of array
            const results = [result].concat(state.results)
            return Object.assign({}, state, {
                results,
            })
    }
    return state
}

const words = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LOAD_WORDS_DONE:
            return Object.assign({}, state, {
                [action.key]: action.words,
            })
    }
    return state
}

const reducer = combineReducers({
    active,
    words,
})

export default reducer
