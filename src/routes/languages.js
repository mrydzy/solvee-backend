'use strict';
const LanguagesController = require('../controllers/languages');

function setupRoute(server, options, next) {
  const languagesController = new LanguagesController(server);

  server.bind(languagesController);

  server.route([
    {
      method: 'GET',
      path: '/languages',
      config: {
        handler: languagesController.index,
        description: 'Languages list',
        notes: 'Return languages',
        tags: ['api']
      }
    }
    ]);
  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-languages',
  version: '1.0.1'
};