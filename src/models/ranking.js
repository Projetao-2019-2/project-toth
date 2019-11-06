'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ranking = sequelize.define('Ranking', {
    points: DataTypes.INTEGER,
    type: Sequelize.STRING
  }, {});
  Ranking.associate = function(models) {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userid' })
  };
  return Ranking;
};
