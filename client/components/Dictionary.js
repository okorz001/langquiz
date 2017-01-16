import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

const Definition = ({word}) => (
    <div className="definition">
        <div className="native">
            {word.native}
        </div>
        <div className="foreign">
            {word.foreign}
        </div>
    </div>
)

Definition.propTypes = {
    word: PropTypes.shape({
        native: PropTypes.string,
        foreign: PropTypes.string,
    }).isRequired,
}

const Dictionary = ({words}) => {
    const defs = words
        .sort((a, b) => a.native.localeCompare(b.native))
        .map(word => <Definition key={word.id} word={word} />)
    return (
        <div className="dictionary">
            {defs}
        </div>
    )
}

Dictionary.propTypes = {
    words: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        native: PropTypes.string.isRequired,
        foreign: PropTypes.string.isRequired,
    })).isRequired,
}

const stateToProps = ({active, words}) => ({
    words: words[active.key] || [],
})

export default connect(stateToProps)(Dictionary)
