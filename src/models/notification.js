module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      texto: DataTypes.TEXT,
      visualizado: DataTypes.BOOLEAN,
      link: DataTypes.STRING,
      userid: DataTypes.INTEGER
    },
    {}
  )
  Notification.associate = function(models) {
    Notification.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'userid'
    })
  }
  return Notification
}
