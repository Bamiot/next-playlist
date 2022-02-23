import db from '../../utils/dbHandler'
import searchAll from '../../utils/searchAll'

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { query, name, token } = req.body || {}

    if (!query) {
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
            searchAll
              .tracks(query)
              .then((data) => {
                new Promise((resolve2) => {
                  data.forEach((s, i, a) => {
                    db.song.getSongByPIds(s.pIds).then((songs) => {
                      // console.log(songs)
                      if (songs.length > 0) s._id = songs[0]._id
                      if (i === a.length - 1) resolve2()
                    })
                  })
                  resolve2()
                }).then(() => {
                  res.status(200).json({
                    status: 'success',
                    result: data
                  })
                  return resolve()
                })
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
