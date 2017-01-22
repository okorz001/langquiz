import * as actionTypes from '../actionTypes'
import * as selectors from '../selectors'
import {saveHistory} from './history'

const rand = (max) => Math.floor(max * Math.random())

const randElement = (arr) => arr[rand(arr.length)]

export const setAnswer = (answer) => ({
    type: actionTypes.SET_ANSWER,
    answer,
})

export const clearAnswer = () => setAnswer('')

const setQuestion = (word) => ({
    type: actionTypes.SET_QUESTION,
    word,
})

export const nextQuestion = () => (dispatch, getState) => {
    const state = getState()
    const words = selectors.getWords(state)

    // avoid picking the same word again
    const quiz = selectors.getCurrentQuiz(state)
    let newWord = randElement(words)
    while (newWord.id == quiz.id) {
        newWord = randElement(words)
    }

    dispatch(clearAnswer())
    dispatch(setQuestion(newWord))
}

const submitAnswer = (key, quiz) => ({
    type: actionTypes.SUBMIT_ANSWER,
    key,
    quiz,
    // TODO: is this unicode safe
    correct: quiz.answer.toLowerCase() == quiz.expected.toLowerCase(),
})

export const sendAnswer = () => (dispatch, getState) => {
    const state = getState()
    const key = selectors.getLangKey(state)
    const quiz = selectors.getCurrentQuiz(state)

    dispatch(submitAnswer(key, quiz))
    dispatch(nextQuestion())
    dispatch(saveHistory())
}
