module.exports = (sequelize, DataTypes) => {
    const Achievements = sequelize.define('Achievements', {
        descricao: DataTypes.TEXT,
        titulo: DataTypes.TEXT,
        pontos: DataTypes.INTEGER
    })

    return Achievements
}