'use strict';

const STYLES_TABLE = 'Styles';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert(STYLES_TABLE, [
        { name: "Solvee", mainColor: '#538BDD' },
        { name: "Autumn", mainColor: '#B44F4A' },
        { name: "Green", mainColor: '#4A7936' },
        { name: "Pink", mainColor: '#DB5B99' },
        { name: "Dark", mainColor: '#373145' }
      ])
    ]
  },

  down: function (queryInterface) {
  }
};
