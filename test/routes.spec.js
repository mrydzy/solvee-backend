"use strict";

const assert = require('assert');
const server = require('../src/index');
const db = server.plugins['database-decisions'].db.sequelize;


describe('route: maps', () => {

  const sampleMap = {
    data: JSON.stringify({"options":[{"id":1,"text":"dsgsdg","children":[]},{"id":2,"text":"sdg","children":[]},{"id":3,"text":"sdg","children":[{"id":31,"text":"sagasg","children":[]},{"id":33,"text":"2","children":[]}]}]}),
    name:'test map',
    lang:'pl',
    photoLink:'http://www.ecotravelmexico.com/wp-content/uploads/2015/05/jaguar2.jpg'
  };
  let userId;
  let treeId;

  before(() => {
    return db.sync({force: true});
  });

  before(() => {
    return Promise.all([
      db.models.Language.create({name: "Polski", shortName: "pl"}),
      db.models.Style.create({name: "Solvee"}),
      db.models.User.create({email: 'test@gmail.com', name: 'jan kowalski', facebookId: 1234})
    ]).then(response => userId = response[1].id);
  });

  after(() => {
    return db.drop({cascade: true})
  });


  it('should save tree', () => {
      const url = '/trees';
      const options = {method: 'POST', url: url, payload: sampleMap, credentials: {userId}};

      return server.inject(options)
        .then(response => {
          assert.equal(response.statusCode, 200);
          treeId = response.result.id;
        });
    });

  it('should load a tree', () => {
    const url = '/trees/' + treeId;
    const options = {method: 'GET', url: url};

    return server.inject(options)
      .then(response => {
        assert.equal(response.result.toJSON().data, sampleMap.data);
      });
  });

  it('should update and publish tree', () => {
    const updatedMap = Object.assign({published: true}, sampleMap);
    const url = '/trees/' + 1;
    const optionsPUT = {method: 'PUT', url: url, payload: updatedMap, credentials: {userId}};
    const optionsGetMap = {method: 'GET', url: url};
    return server.inject(optionsPUT)
      .then(response => {
        return server.inject(optionsGetMap)
      })
      .then(response => {
        assert.notEqual(response.result.publishedAt, null);
      })
  });

  it('should unpublish tree and preserve other fields', () => {
    const updatedMap = {published: false};
    const url = '/trees/' + 1;
    const optionsPATCH = {method: 'PATCH', url: url, payload: updatedMap, credentials: {userId}};
    const optionsGetMap = {method: 'GET', url: url};
    return server.inject(optionsPATCH)
      .then(response => {
        return server.inject(optionsGetMap)
      })
      .then(response => {
        assert.equal(response.result.publishedAt, null);
        assert.equal(response.result.name, 'test map');
      })
  });

});