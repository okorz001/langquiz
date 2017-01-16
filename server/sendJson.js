const sendJson = (req, res, next) => {
    const spaces = +req.query.pretty || 1
    res.sendJson = (data) => {
        res.type('application/json')
        res.send(JSON.stringify(data, null, spaces))
    }
    next()
}

module.exports = sendJson
