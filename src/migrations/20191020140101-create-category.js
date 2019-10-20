'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('categories', {

      id: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: DataTypes.TEXT,
      color: DataTypes.TEXT

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
