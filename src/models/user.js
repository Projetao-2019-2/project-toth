const bcrypt = require('bcrypt')

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
      password: DataTypes.VIRTUAL
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.senha = await bcrypt.hash(user.password, 8)
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
