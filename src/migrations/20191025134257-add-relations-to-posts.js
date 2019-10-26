module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('posts', 'userid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        after: 'texto',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      queryInterface.addColumn('posts', 'categoryid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        after: 'id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      queryInterface.addColumn('posts', 'questionid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions',
          key: 'id'
        },
        after: 'id',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('posts', 'userid'),
      queryInterface.removeColumn('posts', 'categoryid'),
      queryInterface.removeColumn('posts', 'questionid')
    ])
  }
}
