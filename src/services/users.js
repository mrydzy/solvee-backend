'use strict';

const db = require('../services/db');
const dbPluginName = db.register.attributes.name;

function createUserIfNew(server, user) {
  let dbClient = server.plugins[dbPluginName].db.sequelize; //TODO: constructor???? is how to do this?
  var models = dbClient.models;

  return models.User.findOrCreate({
    where: {
      facebookId: user.id
    },
    defaults: {
    name: user.name,
    email: user.email
  }
  });
}

module.exports = {
  createUserIfNew
};
