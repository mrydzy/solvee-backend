'use strict';
const RouteController = require('./route');
const validate = require('./../services/validator').validateTree;
const Boom = require('boom');

class TreesController extends RouteController {
  constructor(server) {
    super(server);
    this.transaction = null;
  }
  index(request, response) {
    const trees = this.models.Tree.findAll();
    response(trees);
  }
  getTree(request, response) {
    const tree = this.models.Tree.findOne({
      where: {
        id: request.params.treeId
      }
    });
    response(tree);
  }
  save(request, response) {
    const treeData = request.payload.data;
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    if (!validate(treeData)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth'));
    }
    const tree = this.models.Tree.create({
      userId: request.auth.credentials.user,
      data: treeData
    });
    response(tree);
  }
  update(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const treeData = request.payload.data;
    if (!validate(treeData)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth'));
    }
    const tree = this.models.Tree.update({
      data: treeData
    }, {
    where: {
      id: request.params.treeId,
      userId: request.auth.credentials.user
    }});
    response(tree);
  }
}

module.exports = TreesController;