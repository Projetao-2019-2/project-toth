module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.TEXT,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
}
