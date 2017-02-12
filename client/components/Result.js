import React, {PropTypes} from 'react'

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

export default Result
