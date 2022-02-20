import db from '../../utils/dbHandler'

export default function handler(req, res) {
  const { id } = req.query
  return new Promise((resolve, reject) => {
    db.song
      .getSong(id)
      .then((song) => {
        res.status(200).json({
          status: 'success',
          result: song
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
