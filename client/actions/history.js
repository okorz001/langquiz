import {SAVE_HISTORY, LOAD_HISTORY} from '../actionTypes'
import {saveData, loadData} from '../storage'

const HISTORY_KEY = 'history'

export const saveHistory = () => (dispatch, getState) => {
    const state = getState()
    saveData(HISTORY_KEY, state.history || null)
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
