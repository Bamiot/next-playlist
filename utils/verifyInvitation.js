import db from './dbHandler'

const rootInvitation = process.env.ROOT_INVITATION

module.exports = {
  verifyInvitation: async (invitation) => {
    return new Promise((resolve, reject) => {
      // decode the invitation (base64)
      const decodedInvitation = Buffer.from(invitation, 'base64').toString()
      console.log('decodedInvitation: ', decodedInvitation)
      if (decodedInvitation === rootInvitation) return resolve(true)
      db.user
        .getUserByName(decodedInvitation)
        .then((user) => {
          console.log('verify: ', user)
          if (user) {
            return resolve(true)
          } else {
            return resolve(false)
          }
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
}
