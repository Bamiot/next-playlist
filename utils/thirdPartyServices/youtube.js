const { song, artist, album, thumbnail } = require('../paterns')
const { google } = require('googleapis')

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUrl = process.env.GOOGLE_REDIRECT_URL
const apiKey = process.env.YOUTUBE_API_KEY

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
})

module.exports = {
  search: (query) => {
    return new Promise((resolve, reject) => {
      youtube.search.list(
        {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: 10
        },
        (err, data) => {
          if (err) return reject(err)
          // console.log(data.data.items)
          return resolve(
            data.data.items.map((item, i) =>
              song(
                item.snippet.title,
                artist(item.snippet.channelTitle),
                album(item.snippet.channelTitle),
                item.snippet.publishedAt,
                thumbnail(
                  item.snippet.thumbnails.default.url,
                  item.snippet.thumbnails.default.height,
                  item.snippet.thumbnails.default.width
                )
              )
            )
          )
        }
      )
    })
  }
}
