'use strict';

require('dotenv').load({ silent: true });
const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const StaticFileHandler = require('inert');
const TemplateRenderer = require('vision');
const Package = require('./../package');
const LogService = require('./services/logs');
const Database = require('./services/db');
const Routing = require('./routes');
const cfg = require('./../config/app');
const AuthBearer = require('hapi-auth-bearer-token');


const server = new Hapi.Server({
  app: cfg
});

const plugins = [
  StaticFileHandler,
  TemplateRenderer,
  {
    register: HapiSwagger,
    options: {
      info: {
        version: Package.version
      }
    }
  },
  {
    register: LogService.handler,
    options: {
      logger: LogService.logger
    }
  },
  Database,
  AuthBearer,
  Routing
];

function init(err) {
  if (err) {
    throw err;
  }

  function execute(err) {
    if (err) {
      throw err;
    }

    server.log('info', 'Server running at: ' + server.info.uri);
  }

  if (!module.parent) {
    server.start(execute);
  }
}

server.connection({
  port: process.env.PORT || cfg.port,
  routes: {
    cors: {
      additionalHeaders: [
        'Authorization'
      ]
    }
  }
});

server.register(plugins, init);

module.exports = server;
