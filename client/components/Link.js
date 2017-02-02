import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {setPage} from '../actions'
import * as selectors from '../selectors'

const onClick = (dispatch, page) => (event) => {
    event.preventDefault()
    dispatch(setPage(page))
}

const Link = ({dispatch, page, current, children}) => {
    const css = ['link']
    if (page == current) css.push('current')
    return (
        <span className={css.join(' ')}
              onClick={onClick(dispatch, page)}>
            {children}
        </span>
    )
}

Link.propTypes = {
    page: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    // The link text
    children: PropTypes.string.isRequired,
}

const stateToProps = (state) => ({
    current: selectors.getPage(state),
})

export default connect(stateToProps)(Link)
