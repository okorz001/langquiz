import fetch from 'isomorphic-fetch'

import * as actionTypes from '../actionTypes'
import {nextQuestion} from './quiz'

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
    return fetch(`/api/words/${key}`)
        .then(response => response.json())
        .then(json => dispatch(loadWordsDone(key, json.words)))
        .then(() => dispatch(nextQuestion()))
        .catch(err => dispatch(loadWordsFail(key, err)))
}
