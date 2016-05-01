'use strict';

const STYLES_TABLE = 'Styles';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert(STYLES_TABLE,
      [{
        name: 'Solvee'
      }, {
        name: 'Pink'
      }, {
        name: 'Dark'
      }, {
        name: 'Autumn'
      }])
    ]
  },

  down: function (queryInterface) {
  }
};
