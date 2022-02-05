const SpotifyWebApi = require('spotify-web-api-node')

const CLIENT_ID = '3526ed9851d74e779b0ced0bba1adf39'
const CLIEN_SECRET = '7c30f9f91e3c424e93c32e86e23a9c3c'

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
            .search(query, ['track'], { limit, offset })
            .then((data) => {
              resolve(data.body)
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
