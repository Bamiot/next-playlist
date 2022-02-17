import db from '../../utils/dbHandler'
import patern from '../../utils/paterns'
import { hashPassword } from '../../utils/hash'
import { verifyInvitation } from '../../utils/verifyInvitation'
import { genToken } from '../../utils/genToken'

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    console.log('join: ', req.body)
    const { username, password, invitation, mail } = req.body || {}
    db.user
      .getUserByName(username)
      .then((user) => {
        if (user) {
          res.status(401).json({
            status: 'error',
            message: 'Username already exists'
          })
        } else {
          db.user
            .getUserByMail(mail)
            .then((user) => {
              if (user) {
                res.status(401).json({
                  status: 'error',
                  message: 'Mail already exists'
                })
              } else {
                verifyInvitation(invitation)
                  .then(async (verified) => {
                    if (verified) {
                      const token = genToken()
                      const newUser = patern.user({
                        name: username,
                        mail: mail,
                        permission: 'user',
                        hash: await hashPassword(password),
                        invitation: invitation,
                        tokens: [token]
                      })
                      db.user
                        .addUser(newUser)
                        .then(() => {
                          res.status(200).json({
                            status: 'success',
                            user: {
                              _id: newUser._id,
                              name: newUser.name,
                              permission: newUser.permission,
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
                        message: 'Invitation not valid'
                      })
                    }
                  })
                  .catch((err) => {
                    res.status(401).json({
                      status: 'error',
                      message: err
                    })
                  })
              }
            })
            .catch((err) => {
              res.status(401).json({
                status: 'error',
                message: err
              })
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
