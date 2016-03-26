'use strict';
const RouteController = require('./route');

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
    if (request.auth.isAuthenticated) {
      const tree = this.models.Tree.create({
        userId: request.auth.credentials.user,
        data: request.payload.data
      });
      response(tree);
    } else {
      response('Bad request - not authenticated');
    }
  }
  update(request, response) {
    if (request.auth.isAuthenticated) {
      const tree = this.models.Tree.update({
        data: request.payload.data
      }, {
        where: {
          id: request.params.treeId,
          userId: request.auth.credentials.user
        }
      });
      response(tree);
    } else {
      response('Bad request - not authenticated');
    }
  }
}

module.exports = TreesController;