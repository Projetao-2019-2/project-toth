const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')

const { S3, bucket } = require('./aws_s3')

const postsConfig = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'uploads', 'posts'),
  storage:
    process.env.NODE_ENV === 'prod'
      ? multerS3({
          s3: S3,
          bucket: bucket,
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function(req, file, callback) {
            const type = file.mimetype.split('/')[0]

            crypto.randomBytes(16, (err, hash) => {
              if (err) {
                callback(err)
              }

              const filename = `${hash.toString('hex')}_${file.originalname}`

              file.filename = filename

              callback(null, `posts/${type}/${filename}`)
            })
          }
        })
      : multer.diskStorage({
          destination: (req, file, callback) => {
            let dest = ''
            const type = file.mimetype.split('/')[0]

            if (type === 'video') {
              dest = path.resolve(
                __dirname,
                '..',
                '..',
                'public',
                'uploads',
                'posts',
                'video'
              )
            } else {
              dest = path.resolve(
                __dirname,
                '..',
                '..',
                'public',
                'uploads',
                'posts',
                'image'
              )
            }

            file.type = type

            callback(null, dest)
          },
          filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
              if (err) {
                callback(err)
              }

              const type = file.mimetype.split('/')[0]

              const filename = `${hash.toString('hex')}_${file.originalname}`

              file.location = `uploads/posts/${type}/${filename}`

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

const usersConfig = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'uploads', 'users'),
  storage:
    process.env.NODE_ENV === 'prod'
      ? multerS3({
          s3: S3,
          bucket: bucket,
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function(req, file, callback) {
            crypto.randomBytes(16, (err, hash) => {
              if (err) {
                callback(err)
              }

              const filename = `${hash.toString('hex')}_${file.originalname}`

              file.filename = filename

              callback(null, `users/${filename}`)
            })
          }
        })
      : multer.diskStorage({
          destination: (req, file, callback) => {
            const dest = path.resolve(
              __dirname,
              '..',
              '..',
              'public',
              'uploads',
              'users'
            )

            callback(null, dest)
          },
          filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
              if (err) {
                callback(err)
              }

              const filename = `${hash.toString('hex')}_${file.originalname}`

              file.location = `uploads/users/${filename}`

              callback(null, filename)
            })
          }
        }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']

    if (!allowedMimes.includes(file.mimetype)) {
      callback(new Error('Unsupported Media Type'))
    }

    callback(null, true)
  }
}

module.exports = { postsConfig, usersConfig }
