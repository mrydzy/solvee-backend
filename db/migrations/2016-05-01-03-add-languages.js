'use strict';

const LANGUAGES_TABLE = 'Languages';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert(LANGUAGES_TABLE, [
        { name: "Polski", shortName: 'pl', createdAt: new Date(), updatedAt: new Date()},
        { name: "English", shortName: 'en',createdAt: new Date(), updatedAt: new Date() }
      ])
    ]
  },

  down: function (queryInterface) {
  }
};
