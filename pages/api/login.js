import db from '../../utils/dbHandler'
import { comparePassword, hashPassword } from '../../utils/hash'
import { genToken } from '../../utils/genToken'

export default async function handler(req, res) {
  console.log('login: ', req.body)

  return new Promise((resolve, reject) => {
    const { username, password } = req.body || {}
    db.user
      .getUserByName(username)
      .then(async (user) => {
        if (user) {
          const isPasswordCorrect = await comparePassword(password, user.hash)
          if (isPasswordCorrect === true) {
            const token = genToken()
            db.user
              .addToken(user._id, token)
              .then(() => {
                res.status(200).json({
                  status: 'success',
                  user: {
                    id: user._id,
                    name: user.name,
                    permission: user.permission,
                    token: token
                  }
                })
              })
              .catch((err) => {
                res.status(401).json({
                  status: 'error',
                  message: err
                })
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
