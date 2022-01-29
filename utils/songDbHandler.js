// impoprt neDB
const Datastore = require('nedb')

const songDB = new Datastore({
  filename: './data/songDB.db',
  autoload: true
})

module.exports = {
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
