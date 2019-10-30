'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('categories', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'name'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('categories', 'description')
  }
}
