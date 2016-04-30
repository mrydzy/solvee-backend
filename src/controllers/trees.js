'use strict';
const RouteController = require('./route');
const validateTree = require('./../services/validator').validateTree;
const validateLang = require('./../services/validator').validateLanguage;
const Boom = require('boom');
const indexTreesMax = process.env.NUMBER_OF_TREES;

class TreesController extends RouteController {
  constructor(server) {
    super(server);
    this.transaction = null;
  }
  index(request, response) {
    const trees = this.models.Tree.findAll({
      include: [{
        model: this.models.User,
        attributes: ['name']
      }],
      attributes: ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3'],
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
        include: [{
          model: this.models.User,
          attributes: ['name']
        }],
        attributes:
          ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3'],
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
        attributes: ['facebookId', 'name', 'id']
      }],
      attributes:
        ['id', 'data', 'name', 'languageId', 'createdAt', 'updatedAt', 'photoLink'],
      where: {
        id: request.params.treeId
      }
    });
    response(tree);
  }
  getListForUser(request, response) {
    const userId = request.params.userId;
    var trees = this.models.Tree.findAll(
      {
        include: [{
          model: this.models.User,
          attributes: ['id', 'name']
        }],
        attributes:
          ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3'],
        order: [['createdAt', 'DESC']],
        limit: indexTreesMax,
        where: {
          userId: userId
        }
      }
    );
    response(trees);
  }
  getListForCurrentUser(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const userId = request.auth.credentials.userId;
    var trees = this.models.Tree.findAll(
      {
        include: [{
          model: this.models.User,
          attributes: ['id', 'name']
        }],
        attributes:
          ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3'],
        order: [['createdAt', 'DESC']],
        limit: indexTreesMax,
        where: {
          userId: userId
        }
      }
    );
    response(trees);
  }

  save(request, response) {
    const data = request.payload.data;
    const name = request.payload.name;
    const lang = request.payload.lang;
    const photoLink = request.payload.photoLink;
    if (!validateTree(data) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    var tree = JSON.parse(data);
    this.models.Tree.create({
      name: name,
      userId: request.auth.credentials.userId,
      data: data,
      photoLink: photoLink,
      languageId: lang,
      child1: tree.options[0].text,
      child2: tree.options.length >=2 ? tree.options[1].text : "?",
      child3: tree.options.length >=3 ? tree.options[2].text : "?"
    }).then((tree) => {
      response(tree);
    });
  }

  update(request, response) {
    const treeData = request.payload.data;
    const lang = request.payload.lang;
    const photoLink = request.payload.photoLink;
    if (!validateTree(treeData) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    var tree = JSON.parse(treeData);
    const treeModel = this.models.Tree.update({
      data: treeData,
      name: request.payload.name,
      languageId: lang,
      photoLink: photoLink,
      userId: request.auth.credentials.userId,
      child1: tree.options[0].text,
      child2: tree.options.length >=2 ? tree.options[1].text : "?",
      child3: tree.options.length >=3 ? tree.options[2].text : "?"
    }, {
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.userId
      }
    });
    response(treeModel);
  }
  remove(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    var tree = this.models.Tree.destroy({
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.userId
      }
    });
    response(tree);
  }

}

module.exports = TreesController;