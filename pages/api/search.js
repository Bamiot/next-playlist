import db from '../../utils/dbHandler'
import searchAll from '../../utils/searchAll'

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { query, name, token } = req.body || {}

    db.user
      .getUserByName(name)
      .then((user) => {
        if (user) {
          if (user.tokens.includes(token)) {
            searchAll
              .tracks(query)
              .then((data) => {
                // console.log('search', data)
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
