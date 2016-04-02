'use strict';

const DECISIONS_TABLE_NAME = 'Trees';
const LANGUAGES_TABLE_NAME = "Languages";
const USERS_TABLE_NAME = "Users";

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
      language: {
        type: Sequelize.INTEGER
      },
      userId: {
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

    const LanguageTable = {
      name: {
        type: Sequelize.STRING
      },
      shortName: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
    };
    const UserTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      preferredLanguage: {
        allowNull: true,
        lang: Sequelize.INTEGER
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
    queryInterface
      .createTable(DECISIONS_TABLE_NAME, TreesTable);
    queryInterface
      .createTable(LANGUAGES_TABLE_NAME, LanguageTable);
    return queryInterface
      .createTable(USERS_TABLE_NAME, LanguageTable);

  },

  down: function (queryInterface) {
    return queryInterface
      .dropAllTables();
  }
};
