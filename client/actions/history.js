import {SAVE_HISTORY, LOAD_HISTORY} from '../actionTypes'
import * as selectors from '../selectors'
import {saveData, loadData} from '../storage'

const HISTORY_KEY = 'history'

export const saveHistory = () => (dispatch, getState) => {
    const state = getState()
    const history = selectors.getAllHistory(state)
    saveData(HISTORY_KEY, history)
    return {
        type: SAVE_HISTORY,
    }
}

export const loadHistory = () => {
    const history = loadData(HISTORY_KEY)
    return {
        type: LOAD_HISTORY,
        history,
    }
}

export const clearHistory = () => {
    clearData(HISTORY_KEY)
    return {
        type: LOAD_HISTORY,
        history: {},
    }
}
