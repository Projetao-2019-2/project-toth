'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      titulo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pontos: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('achievements')
  }
};
