module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {

        id: {
            type: sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        text: DataTypes.STRING(300),
    });

    return Question
}