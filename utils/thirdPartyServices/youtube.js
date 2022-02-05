import { song, artist, album, thumbnail } from '../paterns'
const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi()

async function init() {
  return new Promise((resolve, reject) => {
    api
      .initalize()
      .then((info) => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  search: (query, type = 'song') => {
    return new Promise((resolve, reject) => {
      init()
        .then(() => {
          api
            .search(query, type)
            .then((data) => {
              resolve(
                data.content.map((item, i) =>
                  song(
                    item.name,
                    artist(item.artist.name),
                    album(item.album.name),
                    item.duration,
                    thumbnail(
                      item.thumbnails[1].url,
                      item.thumbnails[1].height,
                      item.thumbnails[1].width
                    )
                  )
                )
              )
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
