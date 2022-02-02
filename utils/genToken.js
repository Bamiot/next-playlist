module.exports = {
  genToken() {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < 32; i++)
      token += char.charAt(Math.floor(Math.random() * char.length))
    return token
  }
}
