import db from '../../utils/dbHandler'

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    db.song
      .getSongs()
      .then((songs) => {
        res.status(200).json({
          status: 'success',
          result: songs
        })
        return resolve()
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          message: err
        })
        return reject(err)
      })
  })
}
