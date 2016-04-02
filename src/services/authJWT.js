'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const createUserIfNew = require('./users').createUserIfNew;

const secret = process.env.APP_SECRET;

function register(server, options, next) {
  function authenticate (request, reply) {
    const authHeader = request.headers.authorization;

    if (!_.isString(authHeader)) {
      return reply(Boom.unauthorized(new Error('Missing Authorization token')));
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const credentials = verify(token);
      createUserIfNew(server, credentials);
      return reply.continue({credentials});
    } catch (e) {
      return reply(Boom.unauthorized(new Error(e.message)));
    }

  }

  server.auth.scheme('jwt', function () {
    return {
      authenticate
    };
  });

  server.auth.strategy('token', 'jwt');

  return next();
}

register.attributes = {
  name: 'auth-service',
  version: '1.0.0'
};

function sign(payload) {
  return jwt.sign(payload, secret);
}

// Verifies JWT and returns payload
function verify(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  register,
  verify,
  sign
};
