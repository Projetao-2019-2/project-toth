module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'facebook_link', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'instagram_link', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'twitter_link', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'imagepath', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'facebook_link'),
      queryInterface.removeColumn('users', 'instagram_link'),
      queryInterface.removeColumn('users', 'twitter_link'),
      queryInterface.removeColumn('users', 'image'),
      queryInterface.removeColumn('users', 'imagepath')
    ])
  }
}
