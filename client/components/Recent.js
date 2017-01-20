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

const Recent = ({results}) => {
    const items = results.map((result, i) =>
        <Result key={i} result={result} />
    )
    return (
        <div className="recent">
            <div>Recent Answers:</div>
            <div className="results">{items}</div>
        </div>
    )
}

Recent.propTypes = {
    results: PropTypes.arrayOf(resultPropType).isRequired,
}

const stateToProps = (state) => ({
    results: selectors.getRecentQuizzes(state),
})

export default connect(stateToProps)(Recent)
