module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      texto: DataTypes.TEXT,
      util: DataTypes.INTEGER,
      n_util: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      categoryid: DataTypes.INTEGER,
      questionid: DataTypes.INTEGER
    },
    {}
  )
  Post.associate = models => {
    Post.hasMany(models.PostFiles, {
      as: 'files',
      onDelete: 'cascade',
      hooks: true
    })
    Post.hasMany(models.Comment, { as: 'comments' })
    Post.belongsTo(models.User, { as: 'author', foreignKey: 'userid' })
    Post.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryid'
    })
    Post.belongsTo(models.Question, {
      as: 'question',
      foreignKey: 'questionid'
    })
  }

  return Post
}
