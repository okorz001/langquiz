import {SET_PAGE} from '../actionTypes'

const INITIAL_STATE = 'quiz'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PAGE:
            return action.page
    }
    return state
}
