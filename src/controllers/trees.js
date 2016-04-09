'use strict';
const RouteController = require('./route');
const validateTree = require('./../services/validator').validateTree;
const validateLang = require('./../services/validator').validateLanguage;
const Boom = require('boom');
const indexTreesMax = process.env.NUMBER_OF_TREES

class TreesController extends RouteController {
  constructor(server) {
    super(server);
    this.transaction = null;
  }
  index(request, response) {
    const trees = this.models.Tree.findAll({
      attributes: ['id', 'name', 'languageId', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: indexTreesMax
    });
    response(trees);
  }
  indexByLang(request, response) {
    const lang = request.params.lang;
    if (!validateLang(lang)) {
      response(Boom.badRequest("That is not language I know you polyglot"));
    }
    const trees = this.models.Tree.findAll(
      {
        attributes:
          ['id', 'name', 'languageId', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: indexTreesMax,
        where: {
          languageId: lang
        }
      }
    );
    response(trees);
  }
  getTree(request, response) {
    const tree = this.models.Tree.findOne({
      include: [{
        model: this.models.User,
        attributes: ['name']
      }],
      attributes:
        ['id', 'data', 'name', 'languageId', 'createdAt', 'updatedAt'],
      where: {
        id: request.params.treeId
      }
    });
    response(tree);
  }
  getListForUser(request, response) {
    const userId = request.params.userId;
    this.models.Tree.findAndCountAll({
      attributes:
        ['id', 'name', 'languageId', 'createdAt'],
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
      userId: request.auth.credentials.userId,
      data: data,
      languageId: lang
    }).then((tree) => {
      response(tree);
    });
  }
  update(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const treeData = request.payload.data;
    const lang = request.payload.lang;
    if (!validateTree(treeData) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    const tree = this.models.Tree.update({
      data: treeData,
      name: request.payload.name,
      languageId: lang,
      userId: request.auth.credentials.userId
    }, {
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.userId
      }
    });
    response(tree);
  }
}

module.exports = TreesController;