module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('postfiles', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'id'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('postfiles', 'name')
  }
}
