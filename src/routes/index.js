'use strict';

function setupRouting(server, options, next) {
  let routes = [
    {
      register: require('./trees')
    },
    {
      register: require('./languages')
    },
    {
      register: require('./users')
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