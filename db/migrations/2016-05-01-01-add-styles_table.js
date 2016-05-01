'use strict';

const STYLES_TABLE = 'Styles';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.createTable(
      STYLES_TABLE, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      })
    ]
  },

  down: function (queryInterface) {
    return queryInterface.dropTable(STYLES_TABLE);
  }
};
