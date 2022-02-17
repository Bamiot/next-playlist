import { song, artist, album } from './paterns'
import youtubeMusic from './thirdPartyServices/youtubeMusic'
import youtube from './thirdPartyServices/youtube'
import spotify from './thirdPartyServices/spotify'
import deezer from './thirdPartyServices/deezer'

module.exports = {
  tracks: (query) =>
    new Promise((resolve, reject) => {
      Promise.all([
        youtubeMusic.search(query, 'song'),
        youtube.search(query, 20),
        spotify.search(query, 20, 0),
        deezer.search(query, 20)
      ])
        .then((results) => {
          const [youtubeMusicResults, youtubeResults, spotifyResults, deezerResults] =
            results
          const allData = [
            ...youtubeMusicResults,
            ...youtubeResults,
            ...spotifyResults,
            ...deezerResults
          ]
          console.log(
            JSON.stringify({
              youtubeMusicResults,
              youtubeResults,
              spotifyResults,
              deezerResults
            })
          )
          return resolve(allData)
        })
        .catch((err) => {
          return reject(err)
        })
    })
}
