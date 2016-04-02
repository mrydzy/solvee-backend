'use strict';
const RouteController = require('./route');
const validateTree = require('./../services/validator').validateTreeTree;
const validateLang = require('./../services/validator').validateLanguage;
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
  getListForUser(request, response) {
    const userId = request.params.userId;
    this.models.Tree.findAndCountAll({
      where: {
        userId: userId
      }
    })
      .then(data => {
        response({
          items: data.rows,
          count: data.count
        })
      });
  }
  save(request, response) {
    const data = request.payload.data;
    const name = request.payload.name;
    const lang = request.payload.lang;
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    if (!validateTree(data) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    this.models.Tree.create({
      name: name,
      userId: request.auth.credentials.user,
      data: data,
      lang: lang
    }).then(response);
  }
  update(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const treeData = request.payload.data;
    if (!validateTree(data) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    const tree = this.models.Tree.update({
      data: treeData,
      name: request.payload.name,
      lang: request.lang
    }, {
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.user,
      }
    });
    response(tree);
  }
}

module.exports = TreesController;