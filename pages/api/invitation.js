import db from '../../utils/dbHandler'

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { name, token } = req.body || {}

    db.user
      .getUserByName(name)
      .then((user) => {
        if (user) {
          if (user.tokens.includes(token)) {
            const invitation = new Buffer(user.name).toString('base64')
            res.status(200).json({
              status: 'success',
              invitation: invitation
            })
          } else {
            res.status(401).json({
              status: 'error',
              message: 'Token is not valid'
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
