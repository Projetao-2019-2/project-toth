module.exports = (sequelize, DataTypes) => {
  const PostEvaluation = sequelize.define(
    'PostEvaluation',
    {
      postid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      evaluation: DataTypes.BOOLEAN
    },
    {}
  )
  PostEvaluation.associate = function(models) {
    PostEvaluation.belongsTo(models.Post)
  }
  return PostEvaluation
}
