// impoprt neDB
const Datastore = require('nedb')

const songDB = new Datastore({
  filename: './data/songDB.db',
  autoload: true
})

const userDB = new Datastore({
  filename: './data/userDB.db',
  autoload: true
})

const song = {
  addSong: (song) => {
    songDB.insert(song)
  },
  getSong: (songId) => {
    return new Promise((resolve, reject) => {
      songDB.findOne({ _id: songId }, (err, song) => {
        if (err) reject(err)
        resolve(song)
      })
    })
  }
}

const user = {
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      userDB.insert(user, (err, newUser) => {
        if (err) reject(err)
        resolve(newUser)
      })
    })
  },
  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      userDB.findOne({ _id: userId }, (err, user) => {
        if (err) reject(err)
        resolve(user)
      })
    })
  },
  getUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      userDB.findOne({ username }, (err, user) => {
        if (err) reject(err)
        resolve(user)
      })
    })
  },
  getUserByMail: (mail) => {
    return new Promise((resolve, reject) => {
      userDB.findOne({ mail }, (err, user) => {
        if (err) reject(err)
        resolve(user)
      })
    })
  }
}

module.exports = {
  song,
  user
}
