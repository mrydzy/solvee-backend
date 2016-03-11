'use strict';

const DECISIONS_TABLE_NAME = 'Trees';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const TreesTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.JSONB
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
    };
    return queryInterface
      .createTable(DECISIONS_TABLE_NAME, TreesTable);
  },

  down: function (queryInterface) {
    return queryInterface
      .dropTable(DECISIONS_TABLE_NAME);
  }
};
