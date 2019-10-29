'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    texto: DataTypes.STRING,
    visualizado: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    Notification.belongsTo(models.User, { as: 'receiver', foreignKey: 'userid' })    
  };
  return Notification;
};