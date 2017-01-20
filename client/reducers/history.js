import {LOAD_HISTORY, SUBMIT_ANSWER} from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_HISTORY:
            return action.history || {}

        case SUBMIT_ANSWER:
            const stateForKey = state[action.key] || {}
            const history = stateForKey[action.quiz.id] || {
                id: action.quiz.id,
                correct: 0,
                total: 0,
            }

            // Update history
            const newHistory = Object.assign({}, history)
            if (action.correct) newHistory.correct++
            newHistory.total++

            // Merge up
            return Object.assign({}, state, {
                [action.key]: Object.assign({}, stateForKey, {
                    [action.quiz.id]: newHistory,
                }),
            })
    }
    return state
}
