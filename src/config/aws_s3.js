const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
})

const S3 = new AWS.S3()

const bucket = 'project-toth'

module.exports = { S3, bucket }
