const storage = window.localStorage || {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
}

export function clearData(key) {
    storage.removeItem(key)
}

export function saveData(key, data) {
    try {
        storage.setItem(key, JSON.stringify(data))
    }
    catch (err) {
        // best effort
        console.warn(err)
    }
}

export function loadData(key) {
    return JSON.parse(storage.getItem(key))
}
