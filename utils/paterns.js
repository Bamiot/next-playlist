module.exports = {
  user: ({ name, mail, permission, hash, invitation, tokens }) => {
    return { name, mail, permission, hash, invitation, tokens }
  },
  song: ({
    name,
    artists,
    description,
    album,
    duration,
    thumbnails,
    releaseDate,
    explicit,
    pIds
  }) => {
    return {
      name,
      artists,
      description,
      album,
      duration,
      thumbnails,
      releaseDate,
      explicit,
      pIds
    }
  },
  thumbnail: ({ url, height, width }) => {
    return { url, height, width }
  },
  pIds: ({ isrc, spotify, youtube }) => {
    return { isrc, spotify, youtube }
  }
}
