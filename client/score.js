// Score component based on percent correct
function perc(correct, total) {
    if (!total) return 0
    return correct / total
}

// Score factor based on total attempts
function attempts(total) {
    if (total == 0) return 0
    if (total == 1) return 0.3
    if (total == 2) return 0.5
    if (total == 3) return 0.8
    return 1
}

// Return a confidence score from 0-100
function score({correct, total}) {
    return 100 * perc(correct, total) * attempts(total)
}

export default score
