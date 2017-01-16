const {MongoClient} = require('mongodb')

const once = require('./once')

const MONGODB_URL = process.env.MONGODB_URL

const connect = once(() => {
    //console.log(`Connecting to ${MONGODB_URL}`)
    console.log(`Connecting`)
    return MongoClient.connect(MONGODB_URL).then(db => {
        console.log('Connected')
        return db
    })
})

function getWords(key) {
    // TODO: languages in the data model
    if (key != 'en-vi') {
        return Promise.resolve([])
    }
    return connect().then(db =>
        db.collection('words').find({}).toArray()
    ).then(words =>
        words.map(word => ({
            id: word._id,
            native: word.native,
            foreign: word.foreign,
        }))
    )
}

module.exports = {
    connect,
    getWords,
}
