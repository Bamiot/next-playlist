// impoprt neDB
// const Datastore = require('nedb')

// const songDB = new Datastore({
//   filename: './data/songDB.db',
//   autoload: true
// })

// const userDB = new Datastore({
//   filename: './data/userDB.db',
//   autoload: true
// })

// import mongodb
const { MongoClient } = require('mongodb')

const url = process.env.DB_URL
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const client = new MongoClient(url, {
  auth: {
    username: DB_USER,
    password: DB_PASSWORD
  }
})

const dbName = 'nextPlaylist'

let songDB
let userDB

const init = async () => {
  await client.connect()
  const db = client.db(dbName)
  songDB = db.collection('songDB')
  userDB = db.collection('userDB')
}

const song = {
  addSong: (song) => {},
  getSong: (songId) => {}
}

const user = {
  addUser: (user) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.insert(user, (err, newUser) => {
        if (err) return reject(err)
        return resolve(newUser)
      })
    })
  },
  getUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.findOne({ _id: userId }, (err, user) => {
        if (err) return reject(err)
        return resolve(user)
      })
    })
  },
  getUserByName: (name) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.findOne({ name }, (err, user) => {
        if (err) reject(err)
        resolve(user)
      })
    })
  },
  getUserByMail: (mail) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.findOne({ mail }, (err, user) => {
        if (err) return reject(err)
        return resolve(user)
      })
    })
  },
  addToken: (userId, token) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.update({ _id: userId }, { $push: { tokens: token } }, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  },
  clearTokens: (userId) => {
    return new Promise(async (resolve, reject) => {
      await init()
      userDB.update({ _id: userId }, { $set: { tokens: [] } }, (err, user) => {
        if (err) return reject(err)
        return resolve(user)
      })
    })
  }
}

module.exports = {
  song,
  user
}
