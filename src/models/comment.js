module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      text: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      postid: DataTypes.INTEGER,
      parentid: DataTypes.INTEGER
    },
    {}
  )
  Comment.associate = models => {
    Comment.belongsTo(models.Post, { as: 'post', foreignKey: 'postid' })
    Comment.belongsTo(models.User, { as: 'author', foreignKey: 'userid' })
    Comment.belongsTo(models.Comment, { as: 'parent', foreignKey: 'parentid' })
    Comment.hasMany(models.Comment, { as: 'children', foreignKey: 'parentid' })
  }

  return Comment
}
