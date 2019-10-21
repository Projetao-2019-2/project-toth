'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  
      nome: Sequelize.TEXT,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
  
      curso: Sequelize.TEXT,
  
      ies: Sequelize.TEXT,
  
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
