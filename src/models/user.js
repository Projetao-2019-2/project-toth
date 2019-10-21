module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    curso: DataTypes.TEXT,

    ies: DataTypes.TEXT,

    senha: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });

  return User
}
