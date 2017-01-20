import {combineReducers} from 'redux'

import history from './history'
import lang from './lang'
import quiz from './quiz'
import recent from './recent'
import words from './words'

export default combineReducers({
    history,
    lang,
    quiz,
    recent,
    words,
})
