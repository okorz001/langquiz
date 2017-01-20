import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {setAnswer, sendAnswer} from '../actions'
import * as selectors from '../selectors'

const onChange = (dispatch) => (event) => {
    event.preventDefault()
    const answer = event.target.value
    dispatch(setAnswer(answer))
}

const onClick = (dispatch) => (event) => {
    event.preventDefault()
    dispatch(sendAnswer())
}

const Results = ({results}) => {
    let n = results.length
    const items = results.map(result =>
        <Result key={n--} correct={result.correct}
                question={result.question} answer={result.answer} />
    )
    return (
        <div className="results">
            Recent Answers: <br />
            {items}
        </div>
    )
}

const Result = ({correct, question, answer}) => {
    const css = correct ? 'right' : 'wrong'
    const mark = correct ? '✔' : '✘'
    const text = `${mark} ${question} → ${answer}`
    return (
        <div className={css}>
            {text}
        </div>
    )
}

const Quiz = ({quiz, results, dispatch}) => (
    <form className="quiz">
        <div className="question">
            {quiz.question}
        </div>
        <input type="text" autoFocus className="answer"
               value={quiz.answer}
               onChange={onChange(dispatch)}>
        </input>
        <button className="submit"
                onClick={onClick(dispatch)}>
            Submit
        </button>
        <Results results={results} />
    </form>
)

Quiz.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        expected: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
    }).isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string.isRequired,
        expected: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        correct: PropTypes.bool.isRequired,
    })).isRequired,
}

const stateToProps = (state) => ({
    quiz: selectors.getCurrentQuiz(state),
    results: selectors.getRecentQuizzes(state),
})

export default connect(stateToProps)(Quiz)
