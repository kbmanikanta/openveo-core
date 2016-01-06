'use strict';

// Module dependencies
var assert = require('chai').assert;
var ut = require('@openveo/test').unit.generator;

// authenticationController.js
describe('authenticationController', function() {
  var request,
    response,
    authenticationController;

  before(function() {
    authenticationController = process.require('app/server/controllers/authenticationController.js');
  });

  beforeEach(function() {
    ut.generatePermissions();
    request = {
      params: {}
    };
    response = {};
  });

  // getPermissionsAction function
  describe('getPermissionsAction', function() {

    it('Should be able to get a list of permissions as a JSON object', function(done) {
      response.status = function() {
        return this;
      };
      response.send = function(data) {
        assert.isDefined(data);
        assert.isArray(data.permissions);
        done();
      };

      authenticationController.getPermissionsAction(request, response, function() {
        assert.ok(false);
      });
    });

  });

  // restrictAction function
  describe('restrictAction', function() {

    it('Should grant access to user if its id is 0', function(done) {
      request = {
        method: 'GET',
        url: '/crud/application',
        params: {},
        user: {
          id: 0
        },
        isAuthenticated: function() {
          return true;
        }
      };

      response.status = function() {
        return this;
      };
      response.send = function() {
        assert.ok(false);
      };

      authenticationController.restrictAction(request, response, function() {
        done();
      });

    });

    it('Should grant access to user with the right permission', function(done) {
      request = {
        method: 'GET',
        url: '/crud/application',
        params: {},
        user: {
          id: 1,
          roles: [
            {
              id: 'role1'
            }
          ],
          permissions: [
            'perm1'
          ]
        },
        isAuthenticated: function() {
          return true;
        }
      };

      authenticationController.restrictAction(request, response, function(error) {
        assert.isUndefined(error);
        done();
      });

    });

  });

});
