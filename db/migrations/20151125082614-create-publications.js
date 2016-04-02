'use strict';

const TREES_TABLE_NAME = 'Trees';
const LANGUAGES_TABLE_NAME = "Languages";
const USERS_TABLE_NAME = "Users";

module.exports = {
  up: function (queryInterface, Sequelize) {

    const LanguageTable = {
      name: {
        type: Sequelize.STRING
      },
      shortName: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
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
    const UserTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facebookId: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      languageId: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Languages',
          key: 'shortName'
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    };

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
      data: {
        type: Sequelize.JSONB
      },
      languageId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Languages',
          key: 'shortName'
        }
      },
      facebookId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'facebookId'
        }
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
      .createTable(LANGUAGES_TABLE_NAME, LanguageTable);
    queryInterface
      .createTable(USERS_TABLE_NAME, UserTable);
    return queryInterface
      .createTable(TREES_TABLE_NAME, TreesTable);

  },

  down: function (queryInterface) {
    return queryInterface
      .dropAllTables();
  }
};
