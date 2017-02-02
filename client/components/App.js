import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'
import Dictionary from './Dictionary'
import Quiz from './Quiz'
import Recent from './Recent'

const App = ({native}) => (
    <div lang={native}>
        <Quiz />
        <hr />
        <Recent />
        <hr />
        <Dictionary />
    </div>
)

App.propTypes = {
    native: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
}

const stateToProps = (state) => ({
    native: selectors.getNativeLang(state),
    page: selectors.getPage(state),
})

export default connect(stateToProps)(App)
