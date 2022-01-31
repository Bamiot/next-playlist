const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  hashPassword: async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  }
}
