module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
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

    Comment.associate = models =>
    {
        Comment.belongsTo(models.Post);
    };

    return Comment;
}