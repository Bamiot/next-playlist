const { song, thumbnail, pIds } = require('../paterns')
const { google } = require('googleapis')

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
              song({
                name: item.snippet.title,
                artists: [item.snippet.channelTitle],
                description: item.snippet.description,
                thumbnails: Object.keys(item.snippet.thumbnails).map((imgKey) =>
                  thumbnail({
                    url: item.snippet.thumbnails[imgKey].url,
                    height: item.snippet.thumbnails[imgKey].height,
                    width: item.snippet.thumbnails[imgKey].width
                  })
                ),
                releaseDate: new Date(item.snippet.publishedAt).toString(),
                pIds: pIds({ youtube: item.id.videoId })
              })
            )
          )
        }
      )
    })
  }
}
