import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {setAnswer, sendAnswer} from '../actions'

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

const Quiz = ({word, answer, results, dispatch}) => (
    <form className="quiz">
        <div className="question">
            {word.foreign}
        </div>
        <input type="text" autoFocus className="answer"
               value={answer}
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
    word: PropTypes.shape({
        native: PropTypes.string,
        foreign: PropTypes.string,
    }).isRequired,
    answer: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
        correct: PropTypes.bool.isRequired,
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
    })).isRequired,
}

const stateToProps = ({active}) => ({
    word: active.word,
    answer: active.answer,
    results: active.results,
})

export default connect(stateToProps)(Quiz)
