const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

const postsConfig = {
  dest: path.resolve(__dirname, '..', '..', 'uploads', 'posts'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let dest = ''
      const type = file.mimetype.split('/')[0]

      if (type === 'video') {
        dest = path.resolve(__dirname, '..', '..', 'uploads', 'posts', 'video')
      } else {
        dest = path.resolve(__dirname, '..', '..', 'uploads', 'posts', 'image')
      }

      callback(null, dest)
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err)
        }

        const filename = `${hash.toString('hex')}_${file.originalname}`

        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/ms-asf',
      'video/webm'
    ]

    if (!allowedMimes.includes(file.mimetype)) {
      callback(new Error('Unsupported Media Type'))
    }

    callback(null, true)
  }
}

module.exports = { postsConfig }
