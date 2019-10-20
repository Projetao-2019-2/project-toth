'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('comments', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false
      },


      text: {
        type: DataTypes.STRING,
        allowNull: false
      },

      score: {
        type: DataTypes.INTEGER
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};
