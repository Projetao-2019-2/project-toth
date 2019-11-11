module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'school', {
      type: Sequelize.TEXT,
      allowNull: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'school')
  }
}
