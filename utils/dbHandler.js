const { MongoClient } = require('mongodb')
const url = process.env.DB_URL
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const options = {
  auth: {
    username: DB_USER,
    password: DB_PASSWORD
  }
}

const client = new MongoClient(url, options)

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
  addSong: (song) => {
    return new Promise((resolve, reject) => {
      songDB.insertOne(song, (err, result) => {
        if (err) return reject(err)
        else return resolve(result)
      })
    })
  },
  getSong: (songId) => {
    return new Promise((resolve, reject) => {
      songDB.findOne({ _id: songId }, (err, result) => {
        if (err) return reject(err)
        else return resolve(result)
      })
    })
  }
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
