module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('SMTP', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
        },

        host: {
            type: DataTypes.STRING,
            allowNull: false
        },

        port: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Comment;
}