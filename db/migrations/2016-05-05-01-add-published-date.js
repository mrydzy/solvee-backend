'use strict';

const TREES_TABLE_NAME = 'Trees';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(TREES_TABLE_NAME, 'publishedAt', {
        type: Sequelize.DATE,
        allowNull: true
      })
    ]
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('publishedAt');
  }
};
