import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'
import Result from './Result'

const Results = ({results, max}) => {
    if (max) {
        results = results.slice(0, max)
    }
    const items = results.map((result, i) =>
        <Result key={i} result={result} />
    )
    return <div id="results">{items}</div>
}

Results.propTypes = {
    results: PropTypes.array.isRequired,
    max: PropTypes.number,
}

const stateToProps = (state) => ({
    results: selectors.getRecentQuizzes(state),
})

export default connect(stateToProps)(Results)
