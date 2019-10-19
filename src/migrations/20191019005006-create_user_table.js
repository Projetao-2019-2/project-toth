'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('users', {

      id: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  
      nome: DataTypes.TEXT,
      email: DataTypes.TEXT,
      curso: DataTypes.TEXT,
      ies: DataTypes.TEXT,
      senha: DataTypes.TEXT,

      createdAt: sequelize.DATE,
      updatedAt: sequelize.DATE,

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
