import loadWords from './loadWords'

import {SET_LANGUAGE} from '../actionTypes'

const setLang = (native, foreign, key) => ({
    type: SET_LANGUAGE,
    native,
    foreign,
    key,
})

export default (native, foreign) => {
    return dispatch => {
        const key = `${native}-${foreign}`
        dispatch(setLang(native, foreign, key))
        dispatch(loadWords(key))
    }
}
