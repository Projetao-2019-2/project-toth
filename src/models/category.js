module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {

    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    name: DataTypes.TEXT,
    color: DataTypes.TEXT
  });

  return Category
}
