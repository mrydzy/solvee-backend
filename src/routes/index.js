'use strict';

function setupRouting(server, options, next) {
  let routes = [
    {
      register: require('./trees')
    }
  ];

  server.register(routes)
    .then(err => {
      if (err) {
        throw err;
      }

      next();
    });
}

exports.register = setupRouting;

exports.register.attributes = {
  name: 'routes',
  version: '1.0.1'
};