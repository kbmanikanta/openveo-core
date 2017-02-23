'use strict';

var chai = require('chai');
var spies = require('chai-spies');
var ApplicationController = process.require('app/server/controllers/ApplicationController.js');
var storage = process.require('app/server/storage.js');
var errors = process.require('app/server/httpErrors.js');

var assert = chai.assert;
chai.should();
chai.use(spies);

// ApplicationController.js
describe('ApplicationController', function() {
  var request;
  var response;
  var applicationController;
  var model;

  beforeEach(function() {
    model = {};
    request = {params: {}, query: {}};
    response = {};
    applicationController = new ApplicationController();
    applicationController.getModel = function() {
      return model;
    };
  });

  afterEach(function() {
    storage.setWebServiceScopes(null);
  });

  // getScopesAction method
  describe('getScopesAction', function() {

    it('should send response with the list of Web Service scopes defined by plugins', function(done) {
      var expectedScopes = [
        {
          id: '42',
          name: '42 name',
          description: '42 description'
        },
        {
          id: '43',
          name: '43 name',
          description: '43 description'
        }
      ];
      storage.setWebServiceScopes(expectedScopes);

      response.send = function(data) {
        assert.deepEqual(data.scopes, expectedScopes, 'Wrong scopes');
        done();
      };

      applicationController.getScopesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should limit scopes information to id, name and description', function(done) {
      var expectedScopes = [
        {
          id: '42',
          extra: 'extra information'
        }
      ];
      storage.setWebServiceScopes(expectedScopes);

      response.send = function(data) {
        assert.isUndefined(data.scopes[0].extra, 'Unexpected "extra" property');
        done();
      };

      applicationController.getScopesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

  });

  // getEntitiesAction method
  describe('getEntitiesAction', function() {

    it('should send response with the paginated list of Web Service clients', function(done) {
      var expectedEntities = [{id: '42'}];
      var expectedPagination = {page: 42, total: 60};

      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        assert.strictEqual(page, 1, 'Wrong default page');
        assert.strictEqual(sort['name'], -1, 'Wrong default sort');
        callback(null, expectedEntities, expectedPagination);
      };

      response.send = function(data) {
        assert.deepEqual(data.entities, expectedEntities, 'Wrong entities');
        assert.strictEqual(data.pagination, expectedPagination, 'Wrong pagination');
        done();
      };

      applicationController.getEntitiesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should be able to search by query', function(done) {
      var expectedQuery = '42';

      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        assert.equal(filter.$text.$search, '"' + expectedQuery + '"', 'Wrong query');
        callback();
      };

      response.send = function(data) {
        done();
      };

      request.query = {query: expectedQuery};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should be able to ask for a specific page', function(done) {
      var expectedPage = 42;

      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        assert.strictEqual(page, expectedPage, 'Wrong page');
        callback();
      };

      response.send = function(data) {
        done();
      };

      request.query = {page: expectedPage};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should be able to limit the number of results per page', function(done) {
      var expectedLimit = 42;

      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        assert.strictEqual(limit, expectedLimit, 'Wrong limit');
        callback();
      };

      response.send = function(data) {
        done();
      };

      request.query = {limit: expectedLimit};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should be able to sort results by name in ascending order', function(done) {
      var expectedSort = 'asc';

      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        assert.strictEqual(sort['name'], 1, 'Wrong sort order');
        callback();
      };

      response.send = function(data) {
        done();
      };

      request.query = {sortOrder: expectedSort};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.ok(false, 'Unexpected call to next middleware');
      });
    });

    it('should call next middleware with an error if limit parameter is under or equal to 0', function(done) {
      request.query = {limit: 0};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.strictEqual(error, errors.GET_APPLICATIONS_WRONG_PARAMETERS, 'Wrong error');
        done();
      });
    });

    it('should call next middleware with an error if page parameter is under or equal to 0', function(done) {
      request.query = {page: 0};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.strictEqual(error, errors.GET_APPLICATIONS_WRONG_PARAMETERS, 'Wrong error');
        done();
      });
    });

    it('should call next middleware with an error if sortBy parameter is not "name"', function(done) {
      request.query = {sortBy: 'wrong sort property'};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.strictEqual(error, errors.GET_APPLICATIONS_WRONG_PARAMETERS, 'Wrong error');
        done();
      });
    });

    it('should call next middleware with an error if sortOrder parameter is not "asc" or "desc"', function(done) {
      request.query = {sortOrder: 'wrong sort order'};
      applicationController.getEntitiesAction(request, response, function(error) {
        assert.strictEqual(error, errors.GET_APPLICATIONS_WRONG_PARAMETERS, 'Wrong error');
        done();
      });
    });

    it('should call next middleware with an error if getting the list of entities failed', function(done) {
      model.getPaginatedFilteredEntities = function(filter, limit, page, sort, populate, callback) {
        callback(new Error('message'));
      };

      applicationController.getEntitiesAction(request, response, function(error) {
        assert.strictEqual(error, errors.GET_APPLICATIONS_ERROR, 'Wrong error');
        done();
      });
    });
  });

});
