const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const { S3Service } = require('../services')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nome: DataTypes.TEXT,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
      },
      type: DataTypes.ENUM('admin', 'undergraduate', 'highschool'),
      curso: DataTypes.TEXT,
      ies: DataTypes.TEXT,
      senha: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      facebook_link: DataTypes.STRING,
      instagram_link: DataTypes.STRING,
      twitter_link: DataTypes.STRING,
      image: DataTypes.STRING,
      imagepath: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.senha = await bcrypt.hash(user.password, 8)
          }
        },
        afterDestroy: (instance, options) => {
          try {
            if (process.env.NODE_ENV === 'prod') {
              const response = S3Service.destroy(`users/${instance.name}`)

              if (response.status === 500) {
                console.error(response.message)
              }
            } else {
              const filepath = path.resolve(
                __dirname,
                '..',
                '..',
                'public',
                instance.imagepath
              )

              fs.unlinkSync(filepath)
            }
          } catch (err) {
            console.error(err)
          }
        }
      },
      defaultScope: {
        attributes: { exclude: ['senha'] }
      },
      scopes: {
        withPassword: {
          attributes: {}
        }
      }
    }
  )

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.senha)
  }

  User.prototype.returnObject = function() {
    this.password = undefined
    this.senha = undefined

    return this
  }

  User.associate = models => {
    User.hasMany(models.Post, { as: 'posts' })
  }

  return User
}
