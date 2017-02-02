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

function renderForeign(foreign) {
    return (str) => <span lang={foreign}>{str}</span>
}

const Dictionary = ({native, foreign, words, history}) => {
    const columns = [
        {label: native, sort: 'string'},
        {label: foreign, sort: 'string', render: renderForeign(foreign)},
        {label: 'score', sort: compareHistory, render: renderHistory},
    ]
    const data = words.map(word => {
        const {id, native, foreign} = word
        const {correct, total} = history[id] || {correct: 0, total: 0}
        return [native, foreign, {correct, total}]
    })
    // Wrap in a div for styling. table has specific display which is tricky.
    return (
        <div id="dictionary">
            <SortableTable columns={columns} data={data} sort={0} />
        </div>
    )
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
