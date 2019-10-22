module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },


        text: {
            type: DataTypes.STRING,
            allowNull: false
        },

        score: {
            type: DataTypes.INTEGER
        }
    });

    return Comment;
}