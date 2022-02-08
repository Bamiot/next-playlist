import { song, thumbnail, pIds } from '../paterns'
const SpotifyWebApi = require('spotify-web-api-node')

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIEN_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const spotify = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIEN_SECRET
})

async function init() {
  return new Promise((resolve, reject) => {
    spotify
      .clientCredentialsGrant()

      .then((data) => {
        spotify.setAccessToken(data.body['access_token'])
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  search: (query, limit, offset) => {
    return new Promise((resolve, reject) => {
      init()
        .then(() => {
          spotify
            .search(query, ['track'], { limit, offset, market: 'FR' })
            .then((data) => {
              resolve(
                data.body.tracks.items.map((item, i) =>
                  song({
                    name: item.name,
                    artists: item.artists.map((artist, i) => artist.name),
                    album: item.album.name,
                    duration: item.duration_ms,
                    thumbnails: item.album.images.map((img) =>
                      thumbnail({ url: img.url, height: img.height, width: img.width })
                    ),
                    releaseDate: new Date(item.album.release_date).toString(),
                    explicit: item.explicit,
                    pIds: pIds({
                      isrc: item.external_ids.isrc,
                      spotify: item.id
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
