import {SUBMIT_ANSWER} from '../actionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case SUBMIT_ANSWER:
            const result = {
                question: action.quiz.question,
                expected: action.quiz.expected,
                answer: action.quiz.answer,
                correct: action.correct,
            }
            // Prepend new result to front of array
            return [result].concat(state)
    }
    return state
}
