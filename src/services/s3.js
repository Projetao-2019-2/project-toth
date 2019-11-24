const { S3, bucket } = require('../config/aws_s3')

class S3Service {
  destroy(filename) {
    try {
      S3.deleteObject({ Bucket: bucket, Key: filename }, (err, data) => {
        if (err) {
          return {
            status: 500,
            message: `Unable to delete file from server: ${err}`
          }
        } else {
          return { status: 200, message: 'File destroyed' }
        }
      })

      return { status: 200, message: 'File destroyed' }
    } catch (err) {
      return {
        status: 500,
        message: `Unable to delete file from server: ${err}`
      }
    }
  }
}

module.exports = new S3Service()
