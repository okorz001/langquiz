import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'
import SortableTable, {compareNumbers} from './SortableTable'

function renderHistory({correct, total}) {
    return `${correct}/${total}`
}

function scoreHistory({correct, total}) {
    return total == 0 ? 0 : correct / total
}

function compareHistory(a, b) {
    // First try correct %
    let ret = compareNumbers(scoreHistory(a), scoreHistory(b))
    // Second, favor more correct answers
    if (ret == 0) {
        ret = compareNumbers(a.correct, b.correct)
    }
    // Third, must be zero right, favor LESS attempts
    if (ret == 0) {
        ret = compareNumbers(-a.total, -b.total)
    }
    // We want to sort history best to worst
    return -ret
}

const Dictionary = ({native, foreign, words, history}) => {
    const columns = [
        {label: native, sort: 'string'},
        {label: foreign, sort: 'string'},
        {label: 'history', sort: compareHistory, render: renderHistory},
    ]
    const data = words.map(word => {
        const {id, native, foreign} = word
        const {correct, total} = history[id] || {correct: 0, total: 0}
        return [native, foreign, {correct, total}]
    })
    return <SortableTable className="dictionary"
                          columns={columns} data={data} sort={0} />
}

Dictionary.propTypes = {
    native: PropTypes.string.isRequired,
    foreign: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        native: PropTypes.string.isRequired,
        foreign: PropTypes.string.isRequired,
    })).isRequired,
    // this is a dynamic object
    history: PropTypes.object.isRequired,
}

const stateToProps = (state) => ({
    native: selectors.getNativeLang(state),
    foreign: selectors.getForeignLang(state),
    words: selectors.getWords(state),
    history: selectors.getHistory(state),
})

export default connect(stateToProps)(Dictionary)
