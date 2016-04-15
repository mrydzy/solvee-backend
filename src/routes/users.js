'use strict';
const Joi = require('joi');
const UsersController = require('../controllers/users');

function setupRoute(server, options, next) {
  const usersController = new UsersController(server);

  server.bind(usersController);

  server.route([
    {
      method: 'GET',
      path: '/users/{userId}',
      config: {
        handler: usersController.getUser,
        description: 'Get user data',
        notes: 'Return user',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            userId: Joi.string().required().description('User ID')
          })
        }
      }
    },
    {
      method: 'GET',
      path: '/users',
      config: {
        auth: 'token',
        handler: usersController.getCurrentUser,
        description: 'Get current user data',
        notes: 'Return user',
        tags: ['api']
      }
    },
    {
      method: 'PUT',
      path: '/users',
      config: {
        auth: 'token',
        handler: usersController.updateCurrentUser,
        description: 'Update current user data',
        notes: 'Return user',
        tags: ['api']
      }
    }
  ]);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-users',
  version: '1.0.1'
};