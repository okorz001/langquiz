import React from 'react'
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

const stateToProps = (state) => ({
    native: selectors.getNativeLang(state),
})

export default connect(stateToProps)(App)
