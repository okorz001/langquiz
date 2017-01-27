import fetch from 'isomorphic-fetch'
import {parse} from 'query-string'

import * as actionTypes from '../actionTypes'
import {nextQuestion} from './quiz'

// should put this in app state if it changes
const QUERY = parse(window.location.search)
const API_HOST = QUERY.apiHost ? '//' + QUERY.apiHost : ''

const loadWordsBegin = (key) => ({
    type: actionTypes.LOAD_WORDS,
    key,
})

const loadWordsDone = (key, words) => ({
    type: actionTypes.LOAD_WORDS_DONE,
    key,
    words,
})

const loadWordsFail = (key, err) => ({
    type: actionTypes.LOAD_WORDS_FAIL,
    key,
    err,
})

export default (key) => (dispatch) => {
    dispatch(loadWordsBegin(key))
    return fetch(`${API_HOST}/api/words/${key}`)
        .then(response => response.json())
        .then(json => dispatch(loadWordsDone(key, json.words)))
        .then(() => dispatch(nextQuestion()))
        .catch(err => dispatch(loadWordsFail(key, err)))
}
