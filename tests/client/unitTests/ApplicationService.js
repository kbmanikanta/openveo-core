'use strict';

window.assert = chai.assert;

// ApplicationService.js
describe('ApplicationService', function() {
  var $httpBackend,
    applicationService;

  // Load openveo application
  beforeEach(module('ov'));

  // Dependencies injections
  beforeEach(inject(function(_$httpBackend_, _applicationService_) {
    $httpBackend = _$httpBackend_;
    applicationService = _applicationService_;
  }));

  // Prepares HTTP responses
  beforeEach(function() {
    $httpBackend.when('POST', /.*/).respond(200, '');
    $httpBackend.when('DELETE', /.*/).respond(200, '');
    $httpBackend.when('PUT', /.*/).respond(200, '');
  });

  // Checks if no HTTP request stays without response
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should be able to ask server for the list of applications', function() {
    $httpBackend.when('GET', /.*/).respond(200, '');
    $httpBackend.expectGET('/be/crud/application');
    applicationService.loadApplications();
    $httpBackend.flush();
  });

  it('Should be able to ask server for the list of scopes', function() {
    $httpBackend.when('GET', /.*/).respond(200, '');
    $httpBackend.expectGET('/be/ws/scopes');
    applicationService.loadScopes();
    $httpBackend.flush();
  });

  it('Should be able to store applications', function() {
    $httpBackend.when('GET', '/be/crud/application').respond(200, {
      entities: [{
        name: 'Example',
        scopes: {
          scope1: {
            description: 'description 1',
            name: 'name 1',
            activated: true
          }
        }
      }]
    }
    );
    $httpBackend.expectGET('/be/crud/application');
    applicationService.loadApplications();
    $httpBackend.flush();

    var applications = applicationService.getApplications();
    assert.isDefined(applications);
    assert.equal(applications.length, 1);
  });

  it('Should be able to store scopes', function() {
    $httpBackend.when('GET', '/be/ws/scopes').respond(200,
      {
        scope1: {
          description: 'description 1',
          name: 'name 1',
          activated: true
        }
      }
    );
    $httpBackend.expectGET('/be/ws/scopes');
    applicationService.loadScopes();
    $httpBackend.flush();
    assert.isDefined(applicationService.getScopes());
  });

});
