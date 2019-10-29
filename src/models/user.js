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

  User.associate = function(models) {
    User.hasMany(models.Notification, { as: 'notifications' })    
  };

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.senha)
  }

  User.prototype.returnObject = function () {
    this.password = undefined
    this.senha = undefined

    return this
  }

  return User
}
