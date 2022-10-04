// require the mongoose package
const mongoose = require('mongoose')

// connect to a mongoDB URI
const uri = 'mongodb://127.0.0.1/bountyServer'
mongoose.connect(uri)

// config console logs for mongoose connection
const db = mongoose.connection
db.once('open', () => console.log(`connect to mongodb on ${db.host}:${db.port} 🤠`))
db.on('error', err => console.log(`ut oh speghtettio 🍝`, err))

// export all models
module.exports = {
    Bounty: require('./Bounty')
}