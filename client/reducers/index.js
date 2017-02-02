import {combineReducers} from 'redux'

import history from './history'
import lang from './lang'
import page from './page'
import quiz from './quiz'
import recent from './recent'
import words from './words'

export default combineReducers({
    history,
    lang,
    page,
    quiz,
    recent,
    words,
})
