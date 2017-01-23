import * as actionTypes from '../actionTypes'
import * as selectors from '../selectors'
import score from '../score'
import {saveHistory} from './history'

const rand = (max) => Math.floor(max * Math.random())

const randElement = (arr) => arr[rand(arr.length)]

function compareNumbers(a, b) {
    return a > b ? 1 : (a < b ? -1 : 0)
}

function getHistory(history, word) {
    return history[word.id] || {correct: 0, total: 0}
}

function chooseWord(words, history, lastWordId) {
    const candidates = []
    const badIds = [lastWordId]
    while (candidates.length < 3) {
        const word = randElement(words)
        if (badIds.indexOf(word.id) == -1) {
            candidates.push(word)
            badIds.push(word.id)
        }
    }
    const sorted = candidates.sort((a, b) => {
        const aScore = score(getHistory(history, a))
        const bScore = score(getHistory(history, b))
        return compareNumbers(aScore, bScore)
    })
    return sorted[0]
}

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
    const history = selectors.getHistory(state)
    const words = selectors.getWords(state)
    const quiz = selectors.getCurrentQuiz(state)

    const newWord = chooseWord(words, history, quiz.id)

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
