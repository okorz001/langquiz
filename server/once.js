function once(f) {
    // Explicit flag in case the result is falsy
    let done = false
    let result
    let promise

    return () => {
        // If we are done, return the result immediately
        if (done) return Promise.resolve(result)
        // Create the promise if it does not exist already
        if (!promise) {
            promise = f().then(_result => {
                // We are done
                done = true
                // Save the result and return it
                return result = _result
            })
        }
        // Return the promise
        return promise
    }
}

module.exports = once
