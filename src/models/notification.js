'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    texto: DataTypes.STRING,
    visualizado: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};