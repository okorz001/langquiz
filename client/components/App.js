import React from 'react'

import Dictionary from './Dictionary'
import Quiz from './Quiz'
import Recent from './Recent'

export default () => (
    <div>
        <Quiz />
        <hr />
        <Recent />
        <hr />
        <Dictionary />
    </div>
)
