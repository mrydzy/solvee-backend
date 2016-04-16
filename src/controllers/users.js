'use strict';
const Boom = require('boom');
const RouteController = require('./route');

class UsersController extends RouteController {
  constructor(server) {
    super(server);
    this.transaction = null;
  }
  getUser(request, response) {
    const user = this.models.User.findOne({
      attributes:
        ['id', 'name', 'createdAt'],
      where: {
        id: request.params.userId
      }
    });
    response(user);
  }
  getCurrentUser(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const user = this.models.User.findOne({
      attributes:
        ['id', 'name', 'email', 'createdAt', 'languageId'],
      where: {
        id: request.auth.credentials.userId
      }
    });
    response(user);
  }
  updateCurrentUser(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const user = this.models.User.update({
      name: request.payload.name,
      email: request.payload.email,
    }, {
      where: {
        id: request.auth.credentials.userId
      }
    });
    response(user);
  }
}

module.exports = UsersController;