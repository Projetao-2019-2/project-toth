module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('comments', 'userid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        after: 'text',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      queryInterface.addColumn('comments', 'postid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id'
        },
        after: 'text',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      queryInterface.addColumn('comments', 'parentid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id'
        },
        after: 'postid',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      queryInterface.removeColumn('comments', 'author'),
      queryInterface.removeColumn('comments', 'score')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('comments', 'postid'),
      queryInterface.removeColumn('comments', 'parentid'),
      queryInterface.removeColumn('comments', 'userid'),
      queryInterface.addColumn('comments', 'author', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('comments', 'score', {
        type: Sequelize.INTEGER
      })
    ])
  }
}
