'use strict';

const TREES_TABLE_NAME = 'Trees';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      TREES_TABLE_NAME,
      'photoLink',
      Sequelize.STRING
    );
  },

  down: function (queryInterface) {
    return queryInterface
      .removeColumn(TREES_TABLE_NAME, 'photoLink');
  }
};
