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
    </form>
)

Quiz.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        expected: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
    }).isRequired,
}

const stateToProps = (state) => ({
    quiz: selectors.getCurrentQuiz(state),
})

export default connect(stateToProps)(Quiz)
