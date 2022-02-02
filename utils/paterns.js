module.exports = {
  user: (name, mail, permission, hash, invitation, tokens) => {
    return { name, mail, permission, hash, invitation, tokens }
  }
}
