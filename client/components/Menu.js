import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'
import Link from './Link'

const Menu = ({page}) => (
    <nav id="menu">
        <Link page="quiz">Quiz</Link>
        <Link page="recent">Recent</Link>
        <Link page="words">Words</Link>
    </nav>
)

Menu.propTypes = {
    page: PropTypes.string.isRequired,
}

const stateToProps = (state) => ({
    page: selectors.getPage(state),
})

export default connect(stateToProps)(Menu)
