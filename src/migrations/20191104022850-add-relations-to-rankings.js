'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('rankings', 'userid', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      after: 'text',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('rankings', 'userid')
  }
};
