'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'Comments',
      'PostId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Post',
          key : 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
   );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Comments',
      'PostId'
    )
  }
};
