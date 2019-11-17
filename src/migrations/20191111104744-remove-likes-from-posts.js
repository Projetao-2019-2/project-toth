module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('posts', 'util'),
      queryInterface.removeColumn('posts', 'n_util')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('posts', 'util', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
      queryInterface.addColumn('posts', 'n_util', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      })
    ])
  }
}
