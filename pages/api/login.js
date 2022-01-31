import db from '../../utils/dbHandler'
import { hash } from '../../utils/hash'

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    console.log('la')
    console.log(req.body)
    const { username, password } = JSON.parse(req.body || '{}')
    db.user
      .getUserByUsername(username)
      .then((user) => {
        if (user) {
          if (hash(password) === user.password) {
            res.status(200).json({
              status: 'success',
              user: {
                id: user._id,
                username: user.username,
                permission: user.permission
              }
            })
          } else {
            res.status(401).json({
              status: 'error',
              message: 'Wrong password'
            })
          }
        } else {
          res.status(401).json({
            status: 'error',
            message: 'User not found'
          })
        }
        return resolve()
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
