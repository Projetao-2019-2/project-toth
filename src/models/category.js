module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    color: DataTypes.TEXT
  })

  return Category
}
