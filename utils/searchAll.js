import { song, artist, album } from './paterns'
import spotify from './thirdPartyServices/spotify'
import youtubeMusic from './thirdPartyServices/youtubeMusic'
import youtube from './thirdPartyServices/youtube'

module.exports = {
  tracks: (query) =>
    new Promise((resolve, reject) => {
      Promise.all([
        youtubeMusic.search(query, 'song'),
        youtube.search(query),
        spotify.search(query, 20, 0)
      ])
        .then((results) => {
          const [youtubeMusicResults, youtubeResults, spotifyResults] = results
          const allData = [...youtubeMusicResults, ...youtubeResults, ...spotifyResults]
          // console.log(allData)
          return resolve(allData)
        })
        .catch((err) => {
          return reject(err)
        })
    })
}
