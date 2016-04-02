'use strict';
const RouteController = require('./route');

class LanguagesController extends RouteController {
  constructor(server) {
    super(server);
    this.transaction = null;
  }
  index(request, response) {
    const languages = this.models.Language.findAll();
    response(languages);
  }
}

module.exports = LanguagesController;