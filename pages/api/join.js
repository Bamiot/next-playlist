import db from '../../utils/dbHandler'
import patern from '../../utils/paterns'
import { hashPassword } from '../../utils/hash'
import { verifyInvitation } from '../../utils/verifyInvitation'

export default function handler(req, res) {
  const { username, password, invitation, mail } = JSON.parse(req.body)
  db.user.getUserByUsername(username).then((user) => {
    if (user) {
      res.status(401).json({
        status: 'error',
        message: 'Username already exists'
      })
    } else {
      db.user.getUserByMail(mail).then((user) => {
        if (user) {
          res.status(401).json({
            status: 'error',
            message: 'Mail already exists'
          })
        } else {
          verifyInvitation(invitation).then((verified) => {
            if (verified) {
              const newUser = patern.user({
                username,
                password: hashPassword(password),
                mail,
                permission: 'user',
                invitation
              })
              db.user.addUser(newUser).then(() => {
                res.status(200).json({
                  status: 'success',
                  user: {
                    id: newUser._id,
                    username: newUser.username,
                    permission: newUser.permission
                  }
                })
              })
            } else {
              res.status(401).json({
                status: 'error',
                message: 'Invitation not valid'
              })
            }
          })
        }
      })
    }
  })
}
