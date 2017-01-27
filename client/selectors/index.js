export function getNativeLang(state) {
    return state.lang.native
}

export function getForeignLang(state) {
    return state.lang.foreign
}

export function getLangKey(state) {
    return state.lang.key
}

export function getWords(state) {
    const key = getLangKey(state)
    return state.words[key] || []
}

export function getHistory(state) {
    const key = getLangKey(state)
    return state.history[key] || {}
}

export function getAllHistory(state) {
    return state.history || {}
}

export function getCurrentQuiz(state) {
    return state.quiz
}

export function getRecentQuizzes(state) {
    return state.recent || []
}

export function getStreak(state) {
    const recent = getRecentQuizzes(state)
    if (!recent) return 0
    // will return -1 if all true
    const streak = recent.findIndex(r => !r.correct)
    return streak == -1 ? recent.length : streak
}
