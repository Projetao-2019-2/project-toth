module.exports = (sequelize, DataTypes) => {
  const PostFiles = sequelize.define(
    'PostFiles',
    {
      path: DataTypes.STRING,
      tipo: DataTypes.STRING,
      postid: DataTypes.INTEGER
    },
    {}
  )
  PostFiles.associate = function (models) {
    // associations can be defined here
  }

  return PostFiles
}
