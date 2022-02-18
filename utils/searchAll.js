import youtubeMusic from './thirdPartyServices/youtubeMusic'
import youtube from './thirdPartyServices/youtube'
import spotify from './thirdPartyServices/spotify'
import deezer from './thirdPartyServices/deezer'

import { agregateSound, findBestMatch, weights } from './mergeSong'

/**
 * merge Results Object into one songs array
 * @param {Object} results Object containing Arrays of results (with as the same of weigth)
 * @returns {Array} Array of songs
 */
function mergeResults(results) {
  const resultName = Object.keys(results) // ['youtubeMusic', 'youtube', 'spotify', 'deezer']

  // start search with each service
  const mergedResults = resultName.map((serviceName) =>
    // search matchs for each song
    results[serviceName]
      .map((referenceSong) => {
        let res = { reference: referenceSong }
        let notFound = 0
        // search matchs for each service
        for (const serviceName2 of resultName) {
          const match = findBestMatch(
            referenceSong,
            results[serviceName2],
            weights[serviceName2]
          )
          if (match.bestMatch === false) {
            notFound++
          } else {
            res[serviceName2] = match.bestMatch
          }
        }

        if (notFound > weights.maxNotFound) return false
        return res
      })
      .filter((x) => x !== false)
      .map((x) => agregateSound(x))
  )
  return mergedResults.reduce((acc, cur) => acc.concat(cur), [])
}

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
          const [youtubeMusic, youtube, spotify, deezer] = results
          const allData = [...youtubeMusic, ...youtube, ...spotify, ...deezer]

          const mergedResults = mergeResults({ youtubeMusic, youtube, spotify, deezer })

          return resolve(mergedResults)
        })
        .catch((err) => {
          return reject(err)
        })
    })
}
