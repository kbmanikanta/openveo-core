'use strict';

var util = require('util');
var e2e = require('@openveo/test').e2e;
var Field = e2e.fields.Field;
var TablePage = e2e.pages.TablePage;
var browserExt = e2e.browser;

/**
 * Creates a new RolePage representing the roles back end page.
 */
function RolePage(model) {
  RolePage.super_.call(this, model);

  // Page path
  this.path = 'be/roles-list';

  // Element finders specific to this page
  this.pageTitleElement = element(by.binding('CORE.ROLES.TITLE'));
  this.pageDescriptionElement = element(by.binding('CORE.ROLES.INFO'));
  this.addFormLabelElement = element(by.binding('CORE.ROLES.ADD_ROLE'));
}

module.exports = RolePage;
util.inherits(RolePage, TablePage);

/**
 * Selects permissions.
 *
 * All permissions not present in the list of permission will be unselected.
 *
 * @param {ElementFinder} elementFinder Element where to look for permissions
 * @param {Array} permissions The list of permissions labels for the role
 * @return {Promise} Promise resolving when permissions are selected
 */
function selectRolePermissions(elementFinder, permissions) {
  var self = this;
  var deferred = protractor.promise.defer();

  if (!permissions.length)
    return protractor.promise.fulfilled();

  // Roles are organized by panels, open panel to search for permissions
  elementFinder.all(by.css('.panel')).each(function(panel, index) {
    var panelBodyElement = panel.element(by.css('.panel-body'));

    panelBodyElement.isDisplayed().then(function(isDisplayed) {
      if (!isDisplayed) {

        // Panel is not opened
        // Open it
        browserExt.click(panel.element(by.css('.panel-heading'))).then(function() {
          browser.wait(self.EC.visibilityOf(panelBodyElement), 5000, 'Missing panel body (' + index + ')');
        });

      }

      // Iterate on each permissions labels;
      browser.waitForAngular().then(function() {
        panel.all(by.css('label')).each(function(label, index) {

          // Test if permission is checked
          label.element(by.css('input')).getAttribute('checked').then(function(isChecked) {

            // Get permission name
            label.getText().then(function(text) {
              var isPartOfPermissions = permissions.indexOf(text.replace(/ ?\*?$/, '')) >= 0;

              if ((!isChecked && isPartOfPermissions) || (isChecked && !isPartOfPermissions)) {

                // Permission not checked and must be or checked and must not
                browserExt.click(label, text);

              }
            });

          });

        });
      });

    });

  }).then(function() {
    return deferred.fulfill();
  }, function(error) {
    return deferred.reject(error);
  });

  return deferred.promise;
}

/**
 * Checks if the roles page is loaded.
 *
 * @return {Promise} Promise resolving when page is fully loaded
 */
RolePage.prototype.onLoaded = function() {
  return browser.wait(this.EC.presenceOf(this.pageTitleElement), 5000, 'Missing roles page title');
};

/**
 * Gets search engine fields.
 *
 * @param {ElementFinder} Search engine element
 * @return {Object} The list of fields
 */
RolePage.prototype.getSearchFields = function(form) {
  var fields = {};

  // Query field
  fields.query = Field.get({
    type: 'text',
    name: this.translations.CORE.ROLES.QUERY_FILTER,
    baseElement: form
  });

  return fields;
};

/**
 * Gets add form fields.
 *
 * @param {ElementFinder} Add form element
 * @return {Object} The list of fields
 */
RolePage.prototype.getAddFormFields = function(form) {
  var fields = {};

  // Name field
  fields.name = Field.get({
    type: 'text',
    name: this.translations.CORE.ROLES.FORM_ADD_NAME,
    baseElement: form
  });

  return fields;
};

/**
 * Gets edit form fields.
 *
 * @param {ElementFinder} Edit form element
 * @return {Obect} The list of fields
 */
RolePage.prototype.getEditFormFields = function(form) {
  var fields = {};

  // Name field
  fields.name = Field.get({
    type: 'text',
    name: this.translations.CORE.ROLES.ATTR_NAME,
    baseElement: form
  });

  return fields;
};

/**
 * Gets the list of permissions for the core.
 *
 * @return {Array} The list of permissions regarding the actual selected language
 */
RolePage.prototype.getCorePermissions = function() {
  return [
    this.translations.CORE.PERMISSIONS.ADD_APPLICATIONS_NAME,
    this.translations.CORE.PERMISSIONS.UPDATE_APPLICATIONS_NAME,
    this.translations.CORE.PERMISSIONS.DELETE_APPLICATIONS_NAME,
    this.translations.CORE.PERMISSIONS.ADD_USERS_NAME,
    this.translations.CORE.PERMISSIONS.UPDATE_USERS_NAME,
    this.translations.CORE.PERMISSIONS.DELETE_USERS_NAME,
    this.translations.CORE.PERMISSIONS.ADD_ROLES_NAME,
    this.translations.CORE.PERMISSIONS.UPDATE_ROLES_NAME,
    this.translations.CORE.PERMISSIONS.DELETE_ROLES_NAME,
    this.translations.CORE.PERMISSIONS.ADD_GROUPS_NAME,
    this.translations.CORE.PERMISSIONS.UPDATE_GROUPS_NAME,
    this.translations.CORE.PERMISSIONS.DELETE_GROUPS_NAME,
    this.translations.CORE.PERMISSIONS.ADD_TAXONOMIES_NAME,
    this.translations.CORE.PERMISSIONS.UPDATE_TAXONOMIES_NAME,
    this.translations.CORE.PERMISSIONS.DELETE_TAXONOMIES_NAME,
    this.translations.CORE.PERMISSIONS.ACCESS_APPLICATIONS_PAGE_NAME,
    this.translations.CORE.PERMISSIONS.ACCESS_USERS_PAGE_NAME,
    this.translations.CORE.PERMISSIONS.ACCESS_ROLES_PAGE_NAME,
    this.translations.CORE.PERMISSIONS.ACCESS_GROUPS_PAGE_NAME
  ];
};

/**
 * Gets the list of permission group for the core.
 *
 * @return {Array} The list of permission groups regarding the actual selected language
 */
RolePage.prototype.getCorePermissionGroups = function() {
  return [
    this.translations.CORE.PERMISSIONS.GROUP_OTHERS,
    this.translations.CORE.PERMISSIONS.GROUP_APPLICATIONS,
    this.translations.CORE.PERMISSIONS.GROUP_USERS,
    this.translations.CORE.PERMISSIONS.GROUP_ROLES,
    this.translations.CORE.PERMISSIONS.GROUP_GROUPS
  ];
};

/**
 * Gets name field.
 *
 * @param {ElementFinder} formElement Element where to look for groups
 * @return {Promise} Promise resolving with the list of permission groups
 */
RolePage.prototype.getPermissionGroups = function(formElement) {
  var deferred = protractor.promise.defer();
  var groups = [];

  // Get groups
  formElement.all(by.css('.panel-heading')).each(function(panelHeading, index) {
    panelHeading.getText().then(function(text) {
      groups.push(text);
    }, function(error) {
      deferred.reject(error);
    });
  }).then(function() {
    deferred.fulfill(groups);
  }, function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
};

/**
 * Gets the list of permissions of a group.
 *
 * @param {String} name Group name
 * @param {ElementFinder} formElement Element where to look for permissions
 * @return {Promise} Promise resolving with the list of permissions
 */
RolePage.prototype.getGroupPermissions = function(name, formElement) {
  var self = this;
  var permissions = [];
  var group;

  return browser.waitForAngular().then(function() {
    formElement.all(by.css('.panel')).each(function(panel, index) {
      panel.getText().then(function(text) {
        if (text === name)
          group = panel;
      });
    });
  }).then(function() {
    if (!group)
      return protractor.promise.rejected(new Error('Group ' + name + ' not found'));

    return browserExt.click(group.element(by.css('.panel-heading'))).then(function() {
      return browser.wait(self.EC.visibilityOf(group.element(by.css('.panel-body'))), 5000, 'Missing panel body (' +
                   name + ')');
    });
  }).then(function() {
    group.all(by.css('.panel-body label')).each(function(label, index) {
      label.getText().then(function(text) {
        permissions.push(text);
      });
    });
  }).then(function() {
    return protractor.promise.fulfilled(permissions);
  });
};

/**
 * Gets permissions.
 *
 * @param {ElementFinder} formElement Element where to look for permissions
 * @return {Promise} Promise resolving with the list of permissions
 */
RolePage.prototype.getPermissions = function(formElement) {
  var self = this;
  var deferred = protractor.promise.defer();
  var permissions = [];

  // Roles are organized by panels, open panel to search for permissions
  formElement.all(by.css('.panel')).each(function(panel, index) {
    var panelBodyElement = panel.element(by.css('.panel-body'));

    // Test if panel is opened
    panelBodyElement.isDisplayed().then(function(isDisplayed) {

      if (!isDisplayed) {

        // Panel is not opened
        // Open it
        browserExt.click(panel.element(by.css('.panel-heading'))).then(function() {
          browser.wait(self.EC.visibilityOf(panelBodyElement), 5000, 'Missing panel body (' + index + ')');
        });

      }

      // Iterate on each permissions labels
      browser.waitForAngular().then(function() {
        panel.all(by.css('label')).each(function(label, index) {

          // Get permission name
          label.getText().then(function(text) {
            permissions.push(text.replace(/ ?\*?$/, ''));
          });

        });
      });

    }, function(error) {
      deferred.reject(error);
    });

  }).then(function() {
    deferred.fulfill(permissions);
  }, function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
};

/**
 * Adds a new role.
 *
 * User must be logged and have permission to create roles.
 *
 * @param {String} name Role name
 * @param {Array} [data] The list of permissions labels for the role
 * @return {Promise} Promise resolving when the role has been added
 */
RolePage.prototype.addLine = function(name, data) {
  var self = this;

  // Open add form
  return this.openAddForm().then(function() {
    var fields = self.getAddFormFields(self.addFormElement);

    // Set role name
    fields.name.setValue(name);

    // Set permissions
    selectRolePermissions.call(self, self.addFormElement, data || []);

    // Click the add button
    browserExt.click(self.addButtonElement);

    // Close add form
    return self.closeAddForm();

  });
};

/**
 * Gets the list of permissions of a role.
 *
 * @param {String} name Role name
 * @return {Promise} Promise resolving with the list of permissions
 */
RolePage.prototype.getRolePermissions = function(name) {
  var self = this;
  var permissions = [];

  // Close eventually opened line
  return this.closeLine().then(function() {

    // Open line
    self.openLine(name);

    // Get permissions
    self.lineDetailElement.all(by.css('.panel')).each(function(panel, index) {

      // Open panel
      browserExt.click(panel.element(by.css('.panel-heading'))).then(function() {
        browser.wait(self.EC.visibilityOf(panel.element(by.css('.panel-body'))), 5000, 'Missing panel body (' +
                     index + ')');

        panel.all(by.css('.panel-body .literal')).first().getText().then(function(text) {
          permissions = permissions.concat(text.split(', '));
        });
      });

    });
  }).then(function() {
    return protractor.promise.fulfilled(permissions);
  });
};

/**
 * Edits role.
 *
 * @param {String} name Role name
 * @param {Array} data The list of permissions labels for the role
 * @return {Promise} Promise resolving when the save button is clicked
 */
RolePage.prototype.editRole = function(name, data) {
  var self = this;

  // Close eventually opened line
  return this.closeLine().then(function() {
    var formElement = self.lineDetailElement.element(by.css('.detail'));
    var fields = self.getEditFormFields(formElement);

    // Open line
    self.openLine(name);

    // Click on edit button
    browserExt.click(self.lineDetailElement.element(by.binding('CORE.UI.FORM_EDIT')));

    // Set role name
    if (data.name !== undefined)
      fields.name.setValue(data.name);

    // Set permissions
    if (data.permissions !== undefined)
      selectRolePermissions.call(self, formElement, data.permissions);

    // Click on save button
    return browserExt.click(self.lineDetailElement.element(by.binding('CORE.UI.FORM_SAVE')));

  });
};
