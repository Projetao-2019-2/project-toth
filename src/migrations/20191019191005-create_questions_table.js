'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createtable(("questions", {

                id: {
                    type: sequelize.INTEGER(11),
                    AlowNull: false,
                    AutoIncrement: true,
                    PrimaryKey: true,
                },


                text: sequelize.STRING(300),

                createdAt: sequelize.DATE,
                updatedAt: sequelize.DATE,

            })


        )
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable("questions");

    }
};