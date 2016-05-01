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
        }
      })
    ]
  },

  down: function (queryInterface) {
    return queryInterface.dropTable(STYLES_TABLE);
  }
};
