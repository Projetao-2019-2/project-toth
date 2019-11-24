module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postevaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      evaluation: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postevaluations')
  }
}
