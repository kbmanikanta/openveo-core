'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var ProfilePage = process.require('tests/client/e2eTests/pages/ProfilePage.js');
var datas = process.require('tests/client/e2eTests/resources/data.json');

// Load assertion library
var assert = chai.assert;
chai.use(chaiAsPromised);

describe('Profile page', function() {
  var page;

  // Prepare page
  before(function() {
    page = new ProfilePage();
    page.logAs(datas.users.coreAdmin);
    page.load();
  });

  // Logout after tests
  after(function() {
    page.logout();
  });

  // Reload page after each test
  afterEach(function() {
    page.refresh();
  });

  it('should display page title', function() {
    assert.eventually.ok(page.pageTitleElement.isPresent());
  });

  it('should display page description', function() {
    assert.eventually.ok(page.pageDescriptionElement.isPresent());
  });

  it('should display user name, email and roles', function() {
    var user = page.getUser();

    // Build user expected roles
    var expectedRolesNames = [];
    user.roles.forEach(function(roleId) {
      expectedRolesNames.push(datas.roles[roleId].name);
    });

    assert.eventually.equal(page.userNameElement.getText(), user.name);
    assert.eventually.equal(page.userEmailElement.getText(), user.email);

    page.userRolesElement.getText().then(function(text) {
      var roles = text.split(', ');
      assert.includeMembers(roles, expectedRolesNames);
    });

    assert.eventually.ok(page.editUserElement.isPresent());
  });

  it('should display form to change password', function() {
    assert.eventually.ok(page.passwordElement.isPresent(), 'Password field is not present');
    assert.eventually.ok(page.confirmPasswordElement.isPresent(), 'Password confirmation field is not present');
    assert.eventually.ok(page.submitPasswordElement.isPresent(), 'Submit button is not present');
    assert.eventually.ok(page.cancelPasswordElement.isPresent(), 'Cancel button is not present');
  });

  it('should be able to change user name', function() {
    var newAdminName = 'test changing user name';
    page.setNameAndSave(newAdminName);
    assert.eventually.equal(page.userNameElement.getText(), newAdminName);
    page.setNameAndSave(page.getUser().name);
    assert.eventually.equal(page.userNameElement.getText(), page.getUser().name);
  });

  it('should not be able to save user without a name', function() {
    assert.isRejected(page.setNameAndSave());
  });

  it('should not be able to change email and roles', function() {
    page.activateEdition();
    assert.eventually.equal(page.userEmailElement.getText(), page.getUser().email);
    assert.eventually.isNotEmpty(page.userRolesElement.getText());
  });

  it('should be able to cancel user edition', function() {
    page.activateEdition();
    page.setName('test cancelling edition');
    page.cancelEdition();
    assert.eventually.equal(page.userNameElement.getText(), page.getUser().name);
  });

  it('should be able to change user password', function() {
    var newPassword = 'test-changing-password';
    var oldPassword = page.getUser().password;

    page.changePassword(newPassword);
    assert.eventually.equal(page.passwordElement.getText(), '');
    assert.eventually.equal(page.confirmPasswordElement.getText(), '');
    assert.eventually.notOk(page.submitPasswordElement.isEnabled());

    page.logAs({
      name: page.getUser().name,
      email: page.getUser().email,
      password: newPassword
    });
    page.load();
    page.changePassword(oldPassword);
  });

  it('should not be able to save password if the two fields are not equal', function() {
    page.setPassword('test-password-confirmation');
    page.setConfirmPassword('test-password-confirmation-different');
    assert.eventually.notOk(page.submitPasswordElement.isEnabled());
  });

  it('should clear password form when hitting cancel', function() {
    page.setPassword('test-cancelling-password-edition');
    page.setConfirmPassword('test-cancelling-password-edition');
    page.cancelPasswordElement.click();
    assert.eventually.equal(page.passwordElement.getText(), '');
    assert.eventually.equal(page.confirmPasswordElement.getText(), '');
    assert.eventually.notOk(page.submitPasswordElement.isEnabled());
  });

  describe('of super administrator', function() {

    // Prepare page
    before(function() {
      page.logAsAdmin();
      return page.load();
    });

    // Logout after tests
    after(function() {
      return page.logout();
    });

    it('should not be able to change password', function() {
      assert.eventually.notOk(page.passwordElement.isDisplayed(), 'Password field is present');
      assert.eventually.notOk(page.confirmPasswordElement.isDisplayed(), 'Password confirmation field is present');
      assert.eventually.notOk(page.submitPasswordElement.isDisplayed(), 'Submit button is present');
      assert.eventually.notOk(page.cancelPasswordElement.isDisplayed(), 'Cancel button is present');
    });

    it('should not be able to edit user information', function() {
      assert.isRejected(page.activateEdition());
    });

  });

  describe('of locked user', function() {

    // Prepare page
    before(function() {
      page.logAs(datas.users.coreLocked);
      return page.load();
    });

    // Logout after tests
    after(function() {
      return page.logout();
    });

    it('should not be able to change password', function() {
      assert.eventually.notOk(page.passwordElement.isDisplayed(), 'Password field is present');
      assert.eventually.notOk(page.confirmPasswordElement.isDisplayed(), 'Password confirmation field is present');
      assert.eventually.notOk(page.submitPasswordElement.isDisplayed(), 'Submit button is present');
      assert.eventually.notOk(page.cancelPasswordElement.isDisplayed(), 'Cancel button is present');
    });

    it('should not be able to edit user information', function() {
      assert.isRejected(page.activateEdition());
    });

  });

  describe('of user without roles', function() {

    // Prepare page
    before(function() {
      page.logAs(datas.users.coreGuest);
      return page.load();
    });

    // Logout after tests
    after(function() {
      return page.logout();
    });

    it('should not display roles', function() {
      assert.eventually.notOk(page.userRolesElement.isPresent());
    });

  });

});
