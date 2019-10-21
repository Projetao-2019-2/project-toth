'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('users', {

      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  
      nome: DataTypes.TEXT,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
  
      curso: DataTypes.TEXT,
  
      ies: DataTypes.TEXT,
  
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
