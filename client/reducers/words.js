import {LOAD_WORDS_DONE} from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_WORDS_DONE:
            return Object.assign({}, state, {
                [action.key]: action.words,
            })
    }
    return state
}
