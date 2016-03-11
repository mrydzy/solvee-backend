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
    const tree = this.models.Tree.create({
      name: request.payload.name,
      data: request.payload.data
    });
    response(tree);
  }
}

module.exports = TreesController;