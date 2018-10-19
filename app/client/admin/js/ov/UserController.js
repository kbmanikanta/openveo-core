'use strict';

(function(app) {

  /**
   * Defines the user controller for the user page.
   */
  function UserController($scope, $filter, entityService, roles) {
    var entityType = 'users';
    var mailPattern = '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$';

    /**
     * Adds a user.
     *
     * @param {Object} user The user data
     */
    function addUser(user) {
      var entity = {
        name: user.name,
        email: user.email,
        password: user.password,
        passwordValidate: user.passwordValidate,
        roles: user.roles || []
      };
      return entityService.addEntities(entityType, null, [entity]);
    }

    /**
     * Removes a list of users.
     *
     * @param {Array} selected The list of user ids to remove
     * @param {Function} reload The reload Function to force reloading the table
     */
    function removeRows(selected, reload) {
      entityService.removeEntities(entityType, null, selected.join(','))
        .then(function() {
          $scope.$emit('setAlert', 'success', $filter('translate')('CORE.USERS.REMOVE_SUCCESS'), 4000);
          reload();
        });
    }

    /**
     * Saves user.
     *
     * @param {Object} user The user data
     */
    function saveUser(user) {
      return entityService.updateEntity(entityType, null, user.id, {
        name: user.name,
        email: user.email,
        roles: user.roles
      });
    }

    /**
     * Builds options for origin filter.
     *
     * @return {Array} Select options
     */
    function buildOriginFilterOptions() {
      var options = [
        {
          value: null,
          name: $filter('translate')('CORE.USERS.ORIGIN_FILTER_ALL')
        }
      ];

      openVeoSettings.authenticationMechanisms.forEach(function(strategy) {
        options.push({
          name: $filter('translate')('CORE.USERS.ORIGIN_FILTER_' + strategy.toUpperCase()),
          value: strategy
        });
      });

      return options;
    }

    $scope.roles = roles.data.entities;

    /*
     *
     * RIGHTS
     *
     */
    $scope.rights = {};
    $scope.rights.add = $scope.checkAccess('core-add-' + entityType);
    $scope.rights.edit = $scope.checkAccess('core-update-' + entityType);
    $scope.rights.delete = $scope.checkAccess('core-delete-' + entityType);

    /*
     *
     * DATATABLE
     */
    var scopeDataTable = $scope.tableContainer = {};
    scopeDataTable.entityType = entityType;
    scopeDataTable.filterBy = [
      {
        key: 'query',
        value: '',
        label: $filter('translate')('CORE.USERS.QUERY_FILTER')
      },
      {
        key: 'origin',
        type: 'select',
        value: null,
        label: $filter('translate')('CORE.USERS.ORIGIN_FILTER'),
        options: buildOriginFilterOptions()
      }
    ];
    scopeDataTable.header = [{
      key: 'name',
      name: $filter('translate')('CORE.USERS.NAME_COLUMN'),
      class: ['col-xs-11']
    },
    {
      key: 'action',
      name: $filter('translate')('CORE.UI.ACTIONS_COLUMN'),
      class: ['col-xs-1']
    }];

    scopeDataTable.actions = [{
      label: $filter('translate')('CORE.UI.REMOVE'),
      warningPopup: true,
      condition: function(row) {
        return $scope.rights.delete && !row.locked && !row.saving;
      },
      callback: function(row, reload) {
        removeRows([row.id], reload);
      },
      global: function(selected, reload) {
        removeRows(selected, reload);
      }
    }];


    /*
     * FORM
     */
    var scopeEditForm = $scope.editFormContainer = {};
    scopeEditForm.model = {};
    scopeEditForm.entityType = entityType;
    scopeEditForm.fields = [
      {
        key: 'originLiteral',
        type: 'simple',
        templateOptions: {
          label: $filter('translate')('CORE.USERS.ATTR_ORIGIN')
        }
      },
      {

        // the key to be used in the model values
        // so this will be bound to vm.user.username
        key: 'name',
        type: 'horizontalEditableInput',
        templateOptions: {
          label: $filter('translate')('CORE.USERS.ATTR_NAME'),
          required: true
        }
      },
      {
        key: 'email',
        type: 'horizontalEditableInput',
        templateOptions: {
          label: $filter('translate')('CORE.USERS.ATTR_EMAIL'),
          required: true,
          pattern: mailPattern
        }
      }];
    if ($scope.roles.length != 0)
      scopeEditForm.fields.push(
        {
          key: 'roles',
          type: 'horizontalEditableMultiCheckbox',
          templateOptions: {
            label: $filter('translate')('CORE.USERS.ATTR_ROLE'),
            required: false,
            options: $scope.roles,
            valueProperty: 'id',
            labelProperty: 'name'
          }
        }
      );
    scopeEditForm.conditionEditDetail = function(row) {
      return $scope.rights.edit && !row.locked;
    };
    scopeEditForm.onSubmit = function(model) {
      return saveUser(model);
    };

    /**
     * Initializes edit form for a given user.
     *
     * @param {Object} row The user being edited
     */
    scopeEditForm.init = function(row) {
      row.originLiteral = $filter('translate')('CORE.USERS.ORIGIN_' + row.origin.toUpperCase());
    };

    /*
     *  FORM Add user
     *
     */
    var scopeAddForm = $scope.addFormContainer = {};
    scopeAddForm.model = {};
    scopeAddForm.fields = [
      {

        // the key to be used in the model values so this will be bound to vm.user.username
        key: 'name',
        type: 'horizontalInput',
        templateOptions: {
          label: $filter('translate')('CORE.USERS.FORM_ADD_NAME'),
          required: true,
          description: $filter('translate')('CORE.USERS.FORM_ADD_NAME_DESC')
        }
      },
      {
        key: 'email',
        type: 'horizontalInput',
        templateOptions: {
          type: 'email',
          label: $filter('translate')('CORE.USERS.FORM_ADD_EMAIL'),
          required: true,
          description: $filter('translate')('CORE.USERS.FORM_ADD_EMAIL_DESC'),
          pattern: mailPattern
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.name' // disabled when username is blank
        }
      },
      {
        key: 'password',
        type: 'horizontalInput',
        templateOptions: {
          type: 'password',
          label: $filter('translate')('CORE.USERS.FORM_ADD_PASSWORD'),
          required: true,
          description: $filter('translate')('CORE.USERS.FORM_ADD_PASSWORD_DESC')
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.email' // disabled when username is blank
        }
      },
      {
        key: 'passwordValidate',
        type: 'horizontalInput',
        templateOptions: {
          type: 'password',
          label: $filter('translate')('CORE.USERS.FORM_ADD_PASSWORD_VALIDATE'),
          required: true,
          description: $filter('translate')('CORE.USERS.FORM_ADD_PASSWORD_VALIDATE_DESC')
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.password' // disabled when username is blank
        }
      }
    ];
    if ($scope.roles.length == 0)
      scopeAddForm.fields.push({
        noFormControl: true,
        type: 'emptyrow',
        templateOptions: {
          label: $filter('translate')('CORE.USERS.FORM_ADD_ROLE'),
          message: $filter('translate')('CORE.USERS.NO_ROLE')
        }
      });
    else
      scopeAddForm.fields.push(
        {
          key: 'roles',
          type: 'horizontalMultiCheckbox',
          templateOptions: {
            label: $filter('translate')('CORE.USERS.FORM_ADD_ROLE'),
            required: false,
            options: $scope.roles,
            valueProperty: 'id',
            labelProperty: 'name',
            description: $filter('translate')('CORE.USERS.FORM_ADD_ROLE_DESC')
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.passwordValidate' // disabled when username is blank
          }
        }
      );

    scopeAddForm.onSubmit = function(model) {
      return addUser(model);
    };

  }

  app.controller('UserController', UserController);
  UserController.$inject = ['$scope', '$filter', 'entityService', 'roles'];

})(angular.module('ov'));
