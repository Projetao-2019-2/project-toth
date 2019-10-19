module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: DataTypes.TEXT,
    email: DataTypes.TEXT,
    curso: DataTypes.TEXT,
    ies: DataTypes.TEXT,
    senha: DataTypes.TEXT
  });

  return User
}
