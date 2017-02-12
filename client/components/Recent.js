import React, {PropTypes} from 'react'

import Results from './Results'
import Streak from './Streak'

const Recent = () => (
    <div id="recent">
        <Streak />
        <Results />
    </div>
)

export default Recent
