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

            // If the user is right, just use expected since answer may have
            // strange capitalization. It's easier to fudge here than with CSS
            if (result.correct) result.answer = result.expected

            // Prepend new result to front of array
            return [result].concat(state)
    }
    return state
}
