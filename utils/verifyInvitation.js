import db from './dbHandler'
module.exports = {
  verifyInvitation: async (invitation) => {
    return new Promise((resolve, reject) => {
      // decode the invitation (base64)
      const decodedInvitation = Buffer.from(invitation, 'base64').toString()
      console.log('decodedInvitation: ', decodedInvitation)
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
