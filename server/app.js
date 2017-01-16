const express = require('express')

const {getWords} = require('./words')

const PORT = process.env.PORT || 8080

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

const app = express()

app.use(express.static('./static'))
app.use(express.static('./build'))

app.get('/api/words/:key', (req, res, next) => {
    const key = req.params.key
    getWords(key).then(words => {
        console.log(`${key} has ${words.length} words`)
        res.send(JSON.stringify({words}, null, 4))
    }).catch(next)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
