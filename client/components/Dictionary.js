import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

const perc = (correct, total) =>
    total == 0 ? 0 : Math.floor(100 * correct / total)

const Definition = ({native, foreign, correct, total}) => (
    <tr className="definition">
        <td className="native">
            {native}
        </td>
        <td className="foreign">
            {foreign}
        </td>
        <td className="history total">
            {`${correct}/${total}`}
        </td>
        <td className="history percent">
            {`(${perc(correct, total)}%)`}
        </td>
    </tr>
)

Definition.propTypes = {
    native: PropTypes.string.isRequired,
    foreign: PropTypes.string.isRequired,
    correct: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}

const Dictionary = ({active, words, history}) => {
    const defs = words
        // TODO: allow other sorting
        .sort((a, b) => a.native.localeCompare(b.native))
        .map(word => {
            const {id, native, foreign} = word
            const historyForWord = history[id] || {}
            const correct = historyForWord.correct || 0
            const total = historyForWord.total || 0
            return <Definition key={id} native={native} foreign={foreign}
                               correct={correct} total={total} />
        })
    // TODO: better table headers
    return (
        <table className="dictionary">
            <thead>
                <tr>
                    <th>{active.native}</th>
                    <th>{active.foreign}</th>
                    <th colSpan="2">History</th>
                </tr>
            </thead>
            <tbody>
                {defs}
            </tbody>
        </table>
    )
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
