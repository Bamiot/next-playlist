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
  },
  comparePassword: async (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}
