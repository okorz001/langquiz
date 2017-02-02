import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'

const Result = ({result}) => {
    const {question, expected, answer, correct} = result

    const css = ['result']
    if (correct) css.push('correct')

    return (
        <div className={css.join(' ')}>
            <span className="question">{question}</span>
            <span className="answer">{answer}</span>
            <span className="expected">{expected}</span>
        </div>
    )
}

const resultPropType = PropTypes.shape({
    question: PropTypes.string.isRequired,
    expected: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
})

Result.propTypes = {
    result: resultPropType.isRequired,
}

const Recent = ({results, streak}) => {
    const items = results.map((result, i) =>
        <Result key={i} result={result} />
    )
    return (
        <div id="recent">
            <div id="streak">
                Current Streak:
                <span className="value">{streak}</span>
            </div>
            <div id="results">{items}</div>
        </div>
    )
}

Recent.propTypes = {
    results: PropTypes.arrayOf(resultPropType).isRequired,
    streak: PropTypes.number.isRequired,
}

const stateToProps = (state) => ({
    results: selectors.getRecentQuizzes(state),
    streak: selectors.getStreak(state),
})

export default connect(stateToProps)(Recent)
