import {SET_LANGUAGE} from '../actionTypes'

const INITIAL_STATE = {
    native: '',
    foreign: '',
    key: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return Object.assign({}, state, {
                native: action.native,
                foreign: action.foreign,
                key: action.key,
            })
    }
    return state
}
