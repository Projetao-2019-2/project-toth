const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

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
          const filepath = path.resolve(
            __dirname,
            '..',
            '..',
            'public',
            instance.imagepath
          )

          try {
            fs.unlinkSync(filepath)
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

  return User
}
