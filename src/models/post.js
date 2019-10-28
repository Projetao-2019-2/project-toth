module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      texto: DataTypes.TEXT,
      util: DataTypes.INTEGER,
      n_util: DataTypes.INTEGER
    },
    {}
  )
  Post.associate = models => {
    Post.hasMany(models.PostFiles, {
      as: 'files',
      onDelete: 'cascade',
      hooks: true
    })
  }

  Post.associate = models => {
    Post.hasMany(models.Comment, {
      as: 'comments',
      onDelete: 'cascade'
    })
  }

  return Post
}
