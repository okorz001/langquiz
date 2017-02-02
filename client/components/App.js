import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as selectors from '../selectors'
import Dictionary from './Dictionary'
import Menu from './Menu'
import Quiz from './Quiz'
import Recent from './Recent'

function getPage(page) {
    switch (page) {
        case 'quiz':
            return <Quiz />
        case 'recent':
            return <Recent />
        case 'words':
            return <Dictionary />
    }
    console.error(`unknown page: ${page}`)
    return null
}

const App = ({native, page}) => (
    <div lang={native}>
        <Menu />
        <main>{getPage(page)}</main>
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
