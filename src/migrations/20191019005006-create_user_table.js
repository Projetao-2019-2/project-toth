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
      email: {
        type: sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
  
      curso: DataTypes.TEXT,
  
      ies: DataTypes.TEXT,
  
      senha: {
        type: sequelize.STRING(50),
        allowNull: false
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
