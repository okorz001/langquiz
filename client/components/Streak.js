import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'

const Streak = ({streak}) => (
    <div id="streak">
        Current Streak:
        <span className="value">{streak}</span>
    </div>
)

Streak.propTypes = {
    streak: PropTypes.number.isRequired,
}

const stateToProps = (state) => ({
    streak: selectors.getStreak(state),
})

export default connect(stateToProps)(Streak)
