import { song, artist, album } from './paterns'
import spotify from './thirdPartyServices/spotify'
import youtube from './thirdPartyServices/youtubeMusic'

module.exports = {
  tracks: (query, limite, offset) =>
    new Promise((resolve, reject) => {
      Promise.all([youtube.search(query, 'song')])
        .then((results) => {
          // console.log(results)
          return resolve(...results)
        })
        .catch((err) => {
          return reject(err)
        })
    })
}
