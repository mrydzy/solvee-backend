'use strict';

const STYLES_TABLE = 'Styles';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert(STYLES_TABLE,
      [{
        name: 'Solvee', createdAt: new Date(), updatedAt: new Date()
      }, {
        name: 'Pink', createdAt: new Date(), updatedAt: new Date()
      }, {
        name: 'Dark', createdAt: new Date(), updatedAt: new Date()
      }, {
        name: 'Autumn', createdAt: new Date(), updatedAt: new Date()
      }])
    ]
  },

  down: function (queryInterface) {
  }
};
