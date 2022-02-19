const { compareTwoStrings } = require('string-similarity')

const globalWeight = {
  minimumScore: 2.8,
  name: 1.8,
  artists: 0.5,
  description: 1,
  album: 0.6,
  duration: 0.8,
  releaseDate: 0.5,
  explicit: 0.1,
  pIds: 10
}

/* Weights */
const weights = {
  maxNotFound: 0,
  youtube: {
    minimumScore: 2.6,
    name: 1.8,
    artists: 0.8,
    description: 0,
    album: 0,
    duration: globalWeight.duration,
    releaseDate: globalWeight.releaseDate,
    explicit: 0,
    pIds: globalWeight.pIds
  },
  spotify: {
    minimumScore: globalWeight.minimumScore,
    name: globalWeight.name,
    artists: globalWeight.artists,
    description: globalWeight.description,
    album: globalWeight.album,
    duration: globalWeight.duration,
    releaseDate: globalWeight.releaseDate,
    explicit: globalWeight.explicit,
    pIds: globalWeight.pIds
  },
  deezer: {
    minimumScore: globalWeight.minimumScore,
    name: globalWeight.name,
    artists: globalWeight.artists,
    description: globalWeight.description,
    album: globalWeight.album,
    duration: globalWeight.duration,
    releaseDate: globalWeight.releaseDate,
    explicit: globalWeight.explicit,
    pIds: globalWeight.pIds
  },
  youtubeMusic: {
    minimumScore: globalWeight.minimumScore,
    name: globalWeight.name,
    artists: globalWeight.artists,
    description: globalWeight.description,
    album: 0,
    duration: globalWeight.duration,
    releaseDate: globalWeight.releaseDate,
    explicit: globalWeight.explicit,
    pIds: globalWeight.pIds
  }
}

/**
 * compare thumbnails
 * @param {Object} a thumbnail
 * @param {Object} b thumbnail
 * @returns {boolean}
 */
const isSameThumbnail = (a, b) =>
  a.width === b.width && a.height === b.height && a.url === b.url

/**
 * return true if type of two object is equal
 * @param {string} type // string, object, array, number, boolean, null, undefined
 * @return {boolean}
 * @example
 * isType('string', 'string', 'string') // true
 * isType('string', 'string', 'object') // false
 */
function isType(objA, objB, type) {
  if (typeof objA !== typeof objB) return false
  if (type === 'string') {
    if (typeof objA !== 'string') return false
    if (objA.trim() === '') return false
    if (objB.trim() === '') return false
  }
  if (type === 'object') {
    if (typeof objA !== 'object') return false
    if (Object.keys(objA).length === 0) return false
    if (Object.keys(objB).length === 0) return false
  }
  if (type === 'array') {
    if (typeof objA !== 'array') return false
    if (objA.length === 0) return false
    if (objB.length === 0) return false
  }
  if (type === 'number') {
    if (typeof objA !== 'number') return false
    if (isNaN(objA)) return false
    if (isNaN(objB)) return false
  }
  if (type === 'boolean') {
    if (typeof objA !== 'boolean') return false
    if (typeof objB !== 'boolean') return false
  }
  return true
}

/**
 * compare two Strings and return a number between 0 and 1
 * @param {string} a
 * @param {string} b
 * @return {Number}
 * @example
 * compareString('string', 'string') // true
 * compareString('string', 'string2') // false
 */
function compareString(a, b) {
  if (!isType(a, b, 'string')) return 0
  return compareTwoStrings(a, b)
}

/**
 * compare two number and return proximity in percent
 * @param {number} a
 * @param {number} b
 * @return {Number}
 * @example
 * compareNumber(1, 1) // 1
 */
function compareNumber(a, b) {
  if (!isType(a, b, 'number')) return 0
  return 1 - Math.abs(a - b) / Math.max(a, b)
}

/**
 * compare two String representing a Date and return proximity in percent
 * @param {string} a
 * @param {string} b
 * @return {Number}
 * @example
 * compareDate('2020-01-01', '2020-01-01') // 1
 */
function compareDate(a, b) {
  if (!isType(a, b, 'string')) return 0
  const aDate = new Date(a)
  const bDate = new Date(b)
  if (isNaN(aDate.getTime())) return 0
  if (isNaN(bDate.getTime())) return 0
  return compareNumber(aDate.getTime(), bDate.getTime())
}

/**
 * Compare two song objects by their 'name' property and return a score
 * @param {Object} a - first object to compare
 * @param {Object} b - second object to compare
 * @return {Number} - score of the comparison
 */
function compare(a, b) {
  const score = {}
  if (isType(a, b, 'object')) {
    if (isType(a.name, b.name, 'string')) {
      // compare name
      score.name = compareString(a.name, b.name)
    }
    if (
      isType(a.artists, b.artists, 'object') &&
      isType(a.artists[0], b.artists[0], 'string')
    ) {
      // compare artists
      score.artists =
        (a.artists.length < b.artists.length ? a.artists : b.artists)
          .map((x, i) =>
            compareString(
              x,
              a.artists.length < b.artists.length ? b.artists[i] : a.artists[i]
            )
          )
          .reduce((pre, cur) => pre + cur, 0) /
        (a.artists.length > b.artists.length ? a.artists : b.artists).length
    }
    if (isType(a.description, b.description, 'string')) {
      // compare description
      score.description = compareString(a.description, b.description)
    }
    if (isType(a.album, b.album, 'string')) {
      // compare album
      score.album = compareString(a.album, b.album)
    }
    if (isType(a.duration, b.duration, 'number')) {
      // compare duration
      score.duration = compareNumber(a.duration, b.duration)
    }
    if (isType(a.releaseDate, b.releaseDate, 'string')) {
      // compare releaseDate
      score.releaseDate = compareDate(a.releaseDate, b.releaseDate)
    }
    if (isType(a.explicit, b.explicit, 'boolean')) {
      // compare explicit
      score.explicit = a.explicit === b.explicit ? 1 : 0
    }
    // if (isType(a.pIds, b.pIds, 'object')) {
    //   // compare pIds
    //   const aid = a.pIds.youtube || a.pIds.youtubeMusic
    //   const bid = b.pIds.youtube || b.pIds.youtubeMusic
    //   if (isType(aid, bid, 'string')) score.pIds = aid.includes(bid) ? 1 : 0
    // }
  }
  Object.keys(score).forEach((key) => {
    const s = score[key]
    score[key] =
      parseFloat(s) === parseFloat(parseInt(s))
        ? parseInt(s)
        : Math.floor(parseFloat(s) * 1000) / 1000
  })
  return score
}

/**
 * reduce score Object to a single score
 * @param {Object} score
 * @return {Number}
 * @example
 * reduceScore({name: 1, artists: 0.5, description: 0.5, album: 0.5, duration: 0.5, releaseDate: 0.5, explicit: 0.5, pId: 0.5}) // 0.5
 */
function reduceSongScore(score, weight) {
  const weightedScore = Object.keys(score).map((key) => score[key] * weight[key])
  return Math.floor(weightedScore.reduce((pre, cur) => pre + cur, 0) * 1000) / 1000
}

/**
 * find the best match with the target in a list of song objects
 * @param {Object} target - target object to compare
 * @param {Array} list - list of song objects to compare
 * @return {Object} - best match
 * @example
 * findBestMatch({ name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }, [{ name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }]) // {bestMatch: { name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }, score: 1}
 */
function findBestMatch(target, list, weight) {
  let bestMatch = false
  let bestScore = 0
  let bestScores = {}
  const scoreMap = list.map((x) => ({ score: compare(target, x), song: x }))
  scoreMap.forEach((x) => {
    x.reduceScore = reduceSongScore(x.score, weight)
    if (x.reduceScore > bestScore) {
      if (x.reduceScore > weight.minimumScore) {
        bestMatch = x
      }
      bestScore = x.reduceScore
      bestScores = x.score
    }
  })
  // console.log(scoreMap.map((x) => x.reduceScore))
  return { bestMatch, bestScore, bestScores }
}

/**
 * agregate list of song objects to a single song object
 * @param {Object} sounds
 * @return {Object} agregated song object
 */
function agregateSound(sounds) {
  const agregated = sounds.reference
  for (const key in sounds) {
    if (key !== 'reference') {
      const sound = sounds[key].song
      if (String(sound.name).length < String(agregated.name).length)
        agregated.name = sound.name
      if (sound.artists.length > agregated.artists.length)
        agregated.artists = sound.artists
      if (String(sound.album).length > String(agregated.album).length)
        agregated.album = sound.album
      if (agregated.duration === undefined) agregated.duration = sound.duration
      if (sound.description) agregated.description += `${sound.description} | `
      if (agregated.releaseDate === undefined) agregated.releaseDate = sound.releaseDate
      if (agregated.explicit === undefined) agregated.explicit = sound.explicit
      agregated.thumbnails = [...agregated.thumbnails, ...sound.thumbnails]
      // pIds
      if (agregated.pIds.isrc === undefined && sound.pIds.isrc !== undefined)
        agregated.pIds.isrc = sound.pIds.isrc
      if (agregated.pIds.spotify === undefined && sound.pIds.spotify !== undefined)
        agregated.pIds.spotify = sound.pIds.spotify
      if (agregated.pIds.youtube === undefined && sound.pIds.youtube !== undefined)
        agregated.pIds.youtube = sound.pIds.youtube
      if (agregated.pIds.apple === undefined && sound.pIds.apple !== undefined)
        agregated.pIds.apple = sound.pIds.apple
      if (agregated.pIds.deezer === undefined && sound.pIds.deezer !== undefined)
        agregated.pIds.deezer = sound.pIds.deezer
      if (agregated.pIds.soundcloud === undefined && sound.pIds.soundcloud !== undefined)
        agregated.pIds.soundcloud = sound.pIds.soundcloud
    }
  }

  // filter thumbnail duplicate
  agregated.thumbnails
    .sort((a, b) => {
      if (a.width > b.width || a.height > b.height) return -1
      if (a.width < b.width || a.height < b.height) return 1
      return 0
    })
    .filter((e, i, a) => {
      if (i === 0) return true
      return !isSameThumbnail(e, a[i - 1])
    })

  return agregated
}

module.exports = {
  weights,
  /**
   * compare two Strings and return a number between 0 and 1
   * @param {string} a
   * @param {string} b
   * @return {Number}
   * @example
   * compareString('string', 'string') // true
   * compareString('string', 'string2') // false
   */
  compareString,
  /**
   * Compare two song objects by their 'name' property and return a score
   * @param {Object} a - first object to compare
   * @param {Object} b - second object to compare
   * @return {Number} - score of the comparison
   */
  compare,
  /**
   * find the best match with the target in a list of song objects
   * @param {Object} target - target object to compare
   * @param {Array} list - list of song objects to compare
   * @return {Object} - best match
   * @example
   * findBestMatch({ name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }, [{ name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }]) // {bestMatch: { name: 'string', artists: ['string'], description: 'string', album: 'string', duration: 1, releaseDate: 'string', explicit: true, pIds: { youtube: 'string' } }, score: 1}
   */
  findBestMatch,
  /**
   * agregate list of song objects to a single song object
   * @param {Object} sounds
   * @return {Object} agregated song object
   */
  agregateSound
}
