const SpotifyWebApi = require('spotify-web-api-node')

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
