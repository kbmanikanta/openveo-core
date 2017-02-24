'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var e2e = require('@openveo/test').e2e;
var UserPage = process.require('tests/client/e2eTests/pages/UserPage.js');
var UserModel = process.require('app/server/models/UserModel.js');
var UserProvider = process.require('app/server/providers/UserProvider.js');
var storage = process.require('app/server/storage.js');
var UserHelper = process.require('tests/client/e2eTests/helpers/UserHelper.js');
var datas = process.require('tests/client/e2eTests/resources/data.json');
var TableAssert = e2e.asserts.TableAssert;

// Load assertion library
var assert = chai.assert;
chai.use(chaiAsPromised);

describe('User page', function() {
  var page, tableAssert, defaultUsers, userHelper;

  /**
   * Verifies roles of a user.
   *
   * @param {String} name The user name
   * @param {Array} expectedUserRoles Expected list of roles expected for the user
   * @return {Promise} Promise resolving when check is done
   */
  function checkRoles(name, expectedUserRoles) {
    return page.getUserRoles(name).then(function(roles) {
      var j = 0;

      for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        if (expectedUserRoles.indexOf(role) >= 0)
          j++;
      }

      assert.equal(j, expectedUserRoles.length, 'Roles of user ' + name + ' are incorrect');
    });
  }

  /**
   * Verifies email of a user.
   *
   * @param {String} name The user name
   * @param {String} expectedEmail Expected user email
   * @return {Promise} Promise resolving when check is done
   */
  function checkEmail(name, expectedEmail) {
    return page.getLineFieldText(name, 'email').then(function(email) {
      assert.equal(email, expectedEmail, 'User email is incorrect');
    });
  }

  // Prepare page
  before(function() {
    var userModel = new UserModel(new UserProvider(storage.getDatabase()));
    userHelper = new UserHelper(userModel);
    page = new UserPage(userModel);
    tableAssert = new TableAssert(page, userHelper);
    page.logAsAdmin();
    userHelper.getEntities().then(function(users) {
      defaultUsers = users;
    });
    page.load();
  });

  after(function() {
    page.logout();
  });

  // Remove all extra users after each test and reload the page
  afterEach(function() {
    userHelper.removeAllEntities(defaultUsers);
    page.refresh();
  });

  it('should display page title', function() {
    assert.eventually.ok(page.pageTitleElement.isPresent());
  });

  it('should display page description', function() {
    assert.eventually.ok(page.pageDescriptionElement.isPresent());
  });

  it('should be able to add / remove a user', function() {
    var name = 'test add / remove user';
    var email = 'test-add-remove@veo-labs.com';
    var password = 'test-add-remove-password';
    var roles = [datas.roles.coreAdmin.name, datas.roles.coreGuest.name];

    // Add new user
    page.addLine(name, {
      email: email,
      password: password,
      passwordValidate: password,
      roles: roles
    });

    // Verify user information
    assert.isFulfilled(page.getLine(name));
    checkRoles(name, roles);
    checkEmail(name, email);

    // Test connection with the new user
    page.logAs({
      name: name,
      email: email,
      password: password
    });

    // Log back to admin
    page.logAsAdmin();
    page.load();

    // Remove user
    page.removeLine(name);
  });

  it('should not be able to add a user without name, email, password or password confirmation', function() {
    var name = 'test add user without all info';
    var email = 'test-add-without-all-info@veo-labs.com';
    var password = 'test-add-without-all-info';

    assert.isRejected(page.addLine(name, {}));
    assert.isRejected(page.addLine(name, {email: email}));
    assert.isRejected(page.addLine(name, {email: 'invalidEmail'}));
    page.addLine(name, {email: email, password: password, passwordValidate: 'wrong'});
    page.getAlertMessages().then(function(messages) {
      assert.equal(messages.length, 1);
    });
    page.closeAlerts();
  });

  it('should not display buttons to change the number of items per page if users lower than 6', function() {
    page.getTotalLines().then(function(totalLines) {
      if (totalLines < 6)
        assert.eventually.equal(page.itemsPerPageLinkElements.count(), 0);
    });
  });

  it('should be able to edit a user', function() {
    var name = 'test edition';
    var newName = 'test edition renamed';
    var newEmail = 'test-edition-renamed@veo-labs.com';
    var newRoles = [datas.roles.coreGuest.name];

    // Create user
    page.addLine(name, {
      email: 'test-edition@veo-labs.com',
      password: 'test-edition',
      passwordValidate: 'test-edition',
      roles: [datas.roles.coreAdmin.name, datas.roles.coreGuest.name]
    });

    // Edit user
    page.editUser(name, {name: newName, email: newEmail, roles: newRoles});

    // Verify user information
    assert.isFulfilled(page.getLine(newName));
    checkRoles(newName, newRoles);
    checkEmail(newName, newEmail);
  });

  it('should not be able to edit a user without name or email', function() {
    var name = 'test edit user without all info';
    var email = 'test-edit-without-all-info@veo-labs.com';
    var password = 'test-edit-without-all-info';
    var roles = [datas.roles.coreAdmin.name, datas.roles.coreGuest.name];

    // Add new user
    page.addLine(name, {
      email: email,
      password: password,
      passwordValidate: password,
      roles: roles
    });

    assert.isRejected(page.editUser(name, {name: '', email: ''}));
  });

  it('should be able to cancel when removing a user', function() {
    return tableAssert.checkCancelRemove(page.translations.CORE.USERS.QUERY_FILTER);
  });

  it('should be able to sort by name', function() {
    return tableAssert.checkSort(page.translations.CORE.USERS.NAME_COLUMN);
  });

  it('should have buttons to change the number of items per page', function() {
    return tableAssert.checkItemsPerPage();
  });

  it('should be able to remove several lines simultaneously', function() {
    return tableAssert.checkMassiveRemove();
  });

  it('should be paginated', function() {
    return tableAssert.checkPagination();
  });

  it('should be able to select lines', function() {
    return tableAssert.checkLinesSelection(page.translations.CORE.USERS.NAME_COLUMN);
  });

  describe('search', function() {
    var lines;

    // Add lines to test search
    before(function() {
      return userHelper.addEntitiesAuto('test search', 2).then(function(addedLines) {
        lines = addedLines;
        return page.refresh();
      });
    });

    it('should be able to search by full name', function() {
      var expectedValues;
      var search = {query: lines[0].name};

      // Get all line values before search
      page.getLineValues(page.translations.CORE.USERS.NAME_COLUMN).then(function(values) {

        // Predict values
        expectedValues = values.filter(function(element) {
          return element === search.query;
        });

      }).then(function() {
        tableAssert.checkSearch(search, expectedValues, page.translations.CORE.USERS.NAME_COLUMN);
      });
    });

    it('should not be able to search by partial name', function() {
      var search = {query: lines[1].name.slice(0, 2)};

      page.search(search);
      assert.isRejected(page.getLineValues(page.translations.CORE.USERS.NAME_COLUMN));
    });

    it('should be case insensitive', function() {
      var expectedValues;
      var search = {query: lines[1].name.toUpperCase()};

      // Get all line values before search
      page.getLineValues(page.translations.CORE.USERS.NAME_COLUMN).then(function(values) {
        var regexp = new RegExp(search.query, 'i');

        // Predict values
        expectedValues = values.filter(function(element) {
          return regexp.test(element);
        });

      }).then(function() {
        tableAssert.checkSearch(search, expectedValues, page.translations.CORE.USERS.NAME_COLUMN);
      });
    });

    it('should be able to clear search', function() {
      var search = {query: lines[0].name};

      page.search(search);
      page.clearSearch();
      assert.isFulfilled(page.getLineValues(page.translations.CORE.USERS.NAME_COLUMN));
    });

  });

});
