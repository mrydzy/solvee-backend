'use strict';

const TREES_TABLE_NAME = 'Trees';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(TREES_TABLE_NAME, 'styleId', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references: {
          model: 'Styles',
          key: 'id'
        }
      })
    ]
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('styleId');
  }
};
