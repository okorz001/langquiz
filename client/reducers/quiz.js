import {SET_QUESTION, SET_ANSWER} from '../actionTypes'

const INITIAL_STATE = {
    id: '',
    question: '',
    expected: '',
    answer: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_QUESTION:
            const {word} = action
            return Object.assign({}, state, {
                id: word.id,
                // TODO: this assumes all quizzes are foreign -> native
                question: word.foreign,
                expected: word.native,
            })

        case SET_ANSWER:
            return Object.assign({}, state, {
                answer: action.answer,
            })
    }
    return state
}
