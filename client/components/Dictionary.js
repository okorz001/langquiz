import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import SortableTable, {compareNumbers} from './SortableTable'

const Dictionary = ({active, words, history}) => {
    const columns = [
        {label: active.native, sort: 'string'},
        {label: active.foreign, sort: 'string'},
        {label: 'history'},
    ]
    const data = words.map(word => {
        const {id, native, foreign} = word
        const {correct, total} = history[id] || {correct: 0, total: 0}
        return [native, foreign, `${correct}/${total}`]
    })
    return <SortableTable className="dictionary"
                          columns={columns} data={data} sort={0} />
}

Dictionary.propTypes = {
    words: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        native: PropTypes.string.isRequired,
        foreign: PropTypes.string.isRequired,
    })).isRequired,
}

const stateToProps = ({active, words, history}) => ({
    active: active || {},
    words: words[active.key] || [],
    history: history[active.key] || {},
})

export default connect(stateToProps)(Dictionary)
