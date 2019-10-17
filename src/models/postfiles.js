const fs = require('fs')
const path = require('path')

module.exports = (sequelize, DataTypes) => {
  const PostFiles = sequelize.define(
    'PostFiles',
    {
      path: DataTypes.STRING,
      tipo: DataTypes.STRING,
      postid: DataTypes.INTEGER
    },
    {
      hooks: {
        afterDestroy: (instance, options) => {
          const filepath = path.resolve(
            __dirname,
            '..',
            '..',
            'public',
            instance.path
          )

          try {
            fs.unlinkSync(filepath)
          } catch (err) {
            console.error(err)
          }
        }
      }
    }
  )
  PostFiles.associate = function (models) {
    PostFiles.belongsTo(models.Post)
  }

  return PostFiles
}
