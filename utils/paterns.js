module.exports = {
  user: (name, mail, permission, hash, invitation, tokens) => {
    return { name, mail, permission, hash, invitation, tokens }
  },
  artist: (name) => {
    return { name }
  },
  album: (name) => {
    return { name }
  },
  song: (name, artist, album, duration, thumbnail) => {
    return { name, artist, album, duration, thumbnail }
  },
  thumbnail: (url, height, width) => {
    return { url, height, width }
  }
}
