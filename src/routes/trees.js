'use strict';
const Joi = require('joi');
const TreesController = require('../controllers/trees');

function setupRoute(server, options, next) {
  const treesController = new TreesController(server);

  server.bind(treesController);

  server.route([
    {
      method: 'GET',
      path: '/trees',
      config: {
        handler: treesController.index,
        description: 'Tree list',
        notes: 'Return trees',
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/trees/{treeId}',
      config: {
        handler: treesController.getTree,
        description: 'Tree list',
        notes: 'Return trees',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            treeId: Joi.number().integer().required().description('Tree ID')
          })
        }
      }
    },
    {
      method: 'POST',
      path: '/trees',
      config: {
        auth: 'token',
        handler: treesController.save,
        description: 'Save a tree',
        notes: 'Save tree',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            data: Joi.any()
          })
        }
      }
    },{
      method: 'PUT',
      path: '/trees/{treeId}',
      config: {
        auth: 'token',
        handler: treesController.update,
        description: 'Update existing tree',
        notes: 'Update tree',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            treeId: Joi.number().integer().required().description('Tree ID')
          }),
          payload: Joi.object().keys({
            data: Joi.any()
          })
        }
      }
    }

  ]);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-publications',
  version: '1.0.1'
};