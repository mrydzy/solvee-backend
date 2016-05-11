'use strict';
const Joi = require('joi');
const TreesController = require('../controllers/trees');

function setupRoute(server, options, next) {
  const treesController = new TreesController(server);

  server.bind(treesController);

  server.route([
    {
      method: 'GET',
      path: '/trees/{userId}/user',
      config: {
        handler: treesController.getListForUser,
        description: 'Tree list for user',
        notes: 'Return trees for user',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            userId: Joi.string().required().description('User ID')
          }),
          query: {
            page: Joi.number().integer().min(1).optional()
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/trees/current',
      config: {
        auth: 'token',
        handler: treesController.getListForCurrentUser,
        description: 'Tree list for user',
        notes: 'Return trees for user',
        tags: ['api'],
        validate: {
          query: {
            page: Joi.number().integer().min(1).optional()
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/index',
      config: {
        handler: treesController.index,
        description: 'Tree list',
        notes: 'Return trees',
        tags: ['api'],
        validate: {
          query: {
            page: Joi.number().integer().min(1).optional(),
            lang: Joi.string().optional()
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/trees/{treeId}',
      config: {
        auth: {
          strategy: 'token',
          mode: 'optional'
        },
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
      method: 'DELETE',
      path: '/trees/{treeId}',
      config: {
        auth: 'token',
        handler: treesController.remove,
        description: 'Delete tree',
        notes: 'Mark as deleted',
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
            name: Joi.string().required(),
            data: Joi.any().required(),
            lang: Joi.string().required(),
            photoLink: Joi.string().optional(),
            styleId: Joi.string().optional()
          })
        }
      }
    }, {
      method: 'PATCH',
      path: '/trees/{treeId}',
      config: {
        auth: 'token',
        handler: treesController.patchTree,
        description: 'Update existing tree',
        notes: 'Update tree',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            treeId: Joi.number().integer().required().description('Tree ID')
          }),
          payload: Joi.object().keys({
            name: Joi.string().optional(),
            data: Joi.any().optional(),
            lang: Joi.string().optional(),
            photoLink: Joi.string().optional(),
            styleId: Joi.string().optional(),
            published: Joi.boolean().optional()
          })
        }
      }
    }, {
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
            name: Joi.string().required(),
            data: Joi.any().required(),
            lang: Joi.string().required(),
            photoLink: Joi.string().optional(),
            styleId: Joi.string(),
            published: Joi.boolean()
          })
        }
      }
    }

  ]);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-trees',
  version: '1.0.1'
};