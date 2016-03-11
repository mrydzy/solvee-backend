'use strict';
const db = require('../services/db');
const dbPluginName = db.register.attributes.name;

class RouteController {
  constructor(server) {
    let dbClient = server.plugins[dbPluginName].db.sequelize;

    this.dbClient = dbClient;
    this.models = dbClient.models;
    this.response = {};
  }
}

module.exports = RouteController;