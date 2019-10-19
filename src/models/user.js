module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: DataTypes.TEXT,
    email: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true
    },

    curso: DataTypes.TEXT,

    ies: DataTypes.TEXT,

    senha: {
      type: sequelize.STRING(50),
      allowNull: false
    }
    
  });

  return User
}
