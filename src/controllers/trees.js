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
    var query = {
      include: [{
        model: this.models.User,
        attributes: ['name']
      }, {
        model: this.models.Style,
        attributes: ['name', 'id']
      }],
      attributes: ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3', 'photoLink'],
      order: [['createdAt', 'DESC']],
      limit: indexTreesMax
    };

    if (request.query.page) {
      query.offset = (request.query.page - 1) * indexTreesMax;
    }

    if (request.query.lang) {
      if (!validateLang(request.query.lang)) {
        response(Boom.badRequest("That is not language I know you polyglot"));
        return;
      }
      query.where = {
        languageId: request.query.lang
      }
    }
    return this.models.Tree
      .findAll(query)
      .then(response)
      .catch(this.handleError);
  }
  
  getTree(request, response) {
    var query = {
      include: [{
        model: this.models.User,
        attributes: ['facebookId', 'name', 'id']
      }, {
        model: this.models.Style,
        attributes: ['name', 'id']
      }],
      attributes:
        ['id', 'data', 'name', 'languageId', 'createdAt', 'updatedAt', 'photoLink'],
      where: {
        id: request.params.treeId
      }
    };

    if (request.query.page) {
      query.offset = (request.query.page - 1) * indexTreesMax;
    }

    return this.models.Tree
      .findOne(query)
      .then(response)
      .catch(this.handleError);
  }

  getListForUser(request, response) {
    const userId = request.params.userId;
    var query = {
      include: [{
        model: this.models.User,
        attributes: ['id', 'name']
      }, {
        model: this.models.Style,
        attributes: ['name', 'id']
      }],
      attributes:
        ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3', 'photoLink'],
      order: [['createdAt', 'DESC']],
      limit: indexTreesMax,
      where: {
        userId: userId
      }
    };

    if (request.query.page) {
      query.offset = (request.query.page - 1) * indexTreesMax;
    }
    return this.models.Tree
      .findAll(query)
      .then(response)
      .catch(this.handleError);
  }

  getListForCurrentUser(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    const userId = request.auth.credentials.userId;
    var query = {
      include: [{
        model: this.models.User,
        attributes: ['id', 'name']
      }, {
        model: this.models.Style,
        attributes: ['name', 'id']
      }],
      attributes:
        ['id', 'name', 'languageId', 'createdAt', 'child1', 'child2', 'child3', 'photoLink'],
      order: [['createdAt', 'DESC']],
      limit: indexTreesMax,
      where: {
        userId: userId
      }
    };

    if (request.query.page) {
      query.offset = (request.query.page - 1) * indexTreesMax;
    }

    return this.models.Tree
      .findAll(query)
      .then(response)
      .catch(this.handleError);
  }

  save(request, response) {
    const data = request.payload.data;
    const name = request.payload.name;
    const lang = request.payload.lang;
    const styleId = request.payload.styleId ? request.payload.styleId : 1;
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
      child2: tree.options.length >=2 ? tree.options[1].text : null,
      child3: tree.options.length >=3 ? tree.options[2].text : null,

    }).then(response)
      .catch(this.handleError);
  }

  update(request, response) {
    const treeData = request.payload.data;
    const lang = request.payload.lang;
    const photoLink = request.payload.photoLink;
    if (!validateTree(treeData) || !validateLang(lang)) {
      response(Boom.badRequest('Tree should have title, at least 1 node and no more that 6 levels of depth, request needs to have correct language.'));
    }
    var tree = JSON.parse(treeData);
    return this.models.Tree.update({
      data: treeData,
      name: request.payload.name,
      languageId: lang,
      photoLink: photoLink,
      userId: request.auth.credentials.userId,
      child1: tree.options[0].text,
      child2: tree.options.length >=2 ? tree.options[1].text : null,
      child3: tree.options.length >=3 ? tree.options[2].text : null,
      styleId: request.payload.styleId
    }, {
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.userId
      }
    })
      .then(response)
      .catch(this.handleError);
  }

  remove(request, response) {
    if (!request.auth.isAuthenticated) {
      response(Boom.unauthorized());
    }
    return this.models.Tree.destroy({
      where: {
        id: request.params.treeId,
        userId: request.auth.credentials.userId
      }
    }).then(response)
      .catch(this.handleError);
  }

}

module.exports = TreesController;