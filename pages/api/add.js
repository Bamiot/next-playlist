import db from '../../utils/dbHandler'

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { song, name, token } = req.body || {}

    if (!song) {
      res.status(400).json({
        status: 'error',
        message: 'Query is required'
      })
      return reject()
    }

    db.user
      .getUserByName(name)
      .then((user) => {
        if (user) {
          if (user.tokens.includes(token)) {
            song.addBy = user
            db.song
              .addSong(song)
              .then((data) => {
                res.status(200).json({
                  status: 'success',
                  result: data
                })
                return resolve()
              })
              .catch((err) => {
                res.status(500).json({
                  status: 'error',
                  message: err
                })
                return reject(err)
              })
          } else {
            res.status(401).json({
              status: 'error',
              message: 'Token is not valid'
            })
            return reject()
          }
        } else {
          res.status(401).json({
            status: 'error',
            message: 'User not found'
          })
          return reject()
        }
      })
      .catch((err) => {
        res.status(401).json({
          status: 'error',
          message: err
        })
        return reject(err)
      })
  })
}
