module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'type', {
      type: Sequelize.ENUM('admin', 'undergraduate', 'highschool'),
      allowNull: false,
      defaultValue: 'undergraduate',
      after: 'email'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'type')
  }
}
