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
  Post.associate = function (models) {
    // associations can be defined here
  }

  return Post
};
