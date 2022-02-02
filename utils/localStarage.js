module.exports = {
  getLocalData(key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  saveLocalData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  clearLocalData() {
    window.localStorage.clear()
  },
  removeLocalData(key) {
    window.localStorage.removeItem(key)
  }
}
