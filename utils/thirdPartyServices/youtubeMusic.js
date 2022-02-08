import { song, thumbnail, pIds } from '../paterns'
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
                  song({
                    name: item.name,
                    artists: [item.artist.name],
                    album: item.album.name,
                    duration: item.duration,
                    thumbnails: item.thumbnails.map((img) =>
                      thumbnail({
                        url: img.url,
                        height: img.height,
                        width: img.width
                      })
                    ),
                    pIds: pIds({
                      youtube: item.videoId
                    })
                  })
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
