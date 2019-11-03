const fs = require('fs')
const path = require('path')

const { S3Service } = require('../services')

module.exports = (sequelize, DataTypes) => {
  const PostFiles = sequelize.define(
    'PostFiles',
    {
      name: DataTypes.STRING,
      path: DataTypes.STRING,
      tipo: DataTypes.STRING,
      postid: DataTypes.INTEGER
    },
    {
      hooks: {
        afterDestroy: (instance, options) => {
          try {
            if (process.env.NODE_ENV === 'prod') {
              const response = S3Service.destroy(
                `posts/${instance.tipo}/${instance.name}`
              )

              if (response.status === 500) {
                console.error(response.message)
              }
            } else {
              const filepath = path.resolve(
                __dirname,
                '..',
                '..',
                'public',
                instance.path
              )

              fs.unlinkSync(filepath)
            }
          } catch (err) {
            console.error(err)
          }
        }
      }
    }
  )
  PostFiles.associate = function(models) {
    PostFiles.belongsTo(models.Post)
  }

  return PostFiles
}
