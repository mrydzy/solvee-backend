'use strict';

const TREES_TABLE_NAME = 'Trees';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [queryInterface.addColumn(
      TREES_TABLE_NAME,
      'child1',
      Sequelize.STRING
    ), queryInterface.addColumn(
      TREES_TABLE_NAME,
      'child2',
      Sequelize.STRING
    ), queryInterface.addColumn(
      TREES_TABLE_NAME,
      'child3',
      Sequelize.STRING
    )];
  },

  down: function (queryInterface) {
    return [queryInterface
      .removeColumn(TREES_TABLE_NAME, 'child1'),
      queryInterface
        .removeColumn(TREES_TABLE_NAME, 'child2'),
      queryInterface
        .removeColumn(TREES_TABLE_NAME, 'child3')
    ];
  }
};
