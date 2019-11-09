module.exports = (sequelize, DataTypes) => {
  const Ranking = sequelize.define(
    'Ranking',
    {
      points: DataTypes.INTEGER,
      type: DataTypes.STRING,
      userid: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  )
  Ranking.associate = function(models) {
    Ranking.belongsTo(models.User, { as: 'user', foreignKey: 'userid' })
  }
  return Ranking
}
