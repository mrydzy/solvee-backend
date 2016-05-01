'use strict';

const STYLES_TABLE = 'Styles';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert(STYLES_TABLE, [
        { name: "Polski", shortName: 'pl' },
        { name: "English", shortName: 'en' }
      ])
    ]
  },

  down: function (queryInterface) {
  }
};
