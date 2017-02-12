import React, {PropTypes} from 'react'

import Quiz from './Quiz'
import Results from './Results'
import Streak from './Streak'

const QuizPage = () => (
    <div id="quizPage">
        <Streak />
        <Quiz />
        <div id="previous">
            Previous Answer:
            <Results max={1} />
        </div>
    </div>
)

export default QuizPage
