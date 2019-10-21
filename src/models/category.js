module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    color: DataTypes.TEXT
  })

  return Category
}
