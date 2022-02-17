import { song, thumbnail, pIds } from '../paterns'
const DeezerPublicApi = require('deezer-public-api')

const deezer = new DeezerPublicApi()

module.exports = {
  search: async (query, limite = 20, offset = 0) => {
    return new Promise((resolve, reject) => {
      deezer.search
        .track(query, 'RANKING', limite, offset)
        .then((res) => {
          resolve(
            res.data.map((track) =>
              song({
                name: track.title,
                artists: [track.artist.name],
                album: track.album.title,
                duration: track.duration * 1000,
                thumbnails: [
                  thumbnail({
                    url: track.album.cover_small,
                    height: 56,
                    width: 56
                  }),
                  thumbnail({
                    url: track.album.cover_medium,
                    height: 250,
                    width: 250
                  }),
                  thumbnail({
                    url: track.album.cover_big,
                    height: 500,
                    width: 500
                  }),
                  thumbnail({
                    url: track.album.cover_xl,
                    height: 1000,
                    width: 1000
                  })
                ],
                explicit: track.explicit_lyrics,
                pIds: pIds({ deezer: track.id })
              })
            )
          )
        })
        .catch(reject)
    })
  }
}
