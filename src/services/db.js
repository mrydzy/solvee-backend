'use strict';

const Sequelize = require('sequelize');
const sqlizr = require('sqlizr');

function setupDatabase (server, options, next) {
  const config = {
    logging: !!process.env.DB_LOGGING_ENABLED ?
      console.log :
      false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: !!process.env.FORCE_DB_SSL
    }
  };
  const uri = process.env.DATABASE_URL || '';
  const sequelize = new Sequelize(uri, config);
  const models = options.models || 'src/models/**/*.js';

  sqlizr(sequelize, models);

  const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
  };

  server.expose('db', db);
  next();
}

exports.register = setupDatabase;

exports.register.attributes = {
  name: 'database-decisions',
  version: '1.0.0'
};