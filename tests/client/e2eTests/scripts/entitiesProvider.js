'use strict';

var async = require('async');
var UserModel = process.require('app/server/models/UserModel.js');
var RoleModel = process.require('app/server/models/RoleModel.js');
var ClientModel = process.require('app/server/models/ClientModel.js');

/**
 * Imports roles from JSON file into database.
 *
 * @example
 *
 *     var roles = { // Defines roles to import
 *      "core": { // Role reference which can be used by "users" property
 *        "name": "Core administrator", // Role name
 *        "permissions": [ // List of permission ids (as defined in conf.json) for the role
 *          "create-application",
 *          "update-application"
 *        ]
 *       },
 *     };
 *
 *     loader.importRoles(roles, function(error, roles){
 *       console.log('Roles imported into database');
 *     });
 *
 * @param {Object} roles Roles description object
 * @return {Function} Function to call when all roles are imported
 */
module.exports.importRoles = function(roles, callback) {
  var parallel = [];
  var roleModel = new RoleModel();

  // Create function for async to add a role to the database
  function createAddFunction(roleKey) {
    var role = roles[roleKey];
    role.id = roleKey;

    // Add function to the list of functions to execute in parallel
    parallel.push(function(callback) {

      // Add role
      roleModel.add(role, function(error, addedRole) {
        callback(error);
      });

    });
  }

  // Create functions to add roles with async
  for (var roleKey in roles)
    createAddFunction(roleKey);

  // Asynchonously create roles
  async.parallel(parallel, function(error) {
    if (error) {
      throw error;
    } else {
      callback(null, roles);
    }
  });
};

/**
 * Imports users from JSON file in database.
 *
 * @example
 *
 *     var users = { // Define users to import
 *       "coreAdmin": { // Not used internally
 *         "name": "Core administrator", // User name
 *         "email": "core-admin@veo-labs.com", // User email
 *         "password": "core-admin", // User password
 *         "roles": [ "coreAdmin", "guest" ] // User role reference as defined in roles property
 *       }
 *     };
 *
 *     loader.importUsers(users, function(error, users){
 *       console.log('Users imported into database');
 *     });
 *
 * @param {Object} users Users description object
 * @return {Function} Function to call when all users are imported
 */
module.exports.importUsers = function(users, callback) {
  var parallel = [];
  var userModel = new UserModel();

  // Create function for async to add a user to the database
  function createAddFunction(userKey) {
    var user = users[userKey];
    user.passwordValidate = user.password;

    parallel.push(function(callback) {
      userModel.add(user, callback);
    });
  }

  // Create functions to add users with async
  for (var userKey in users)
    createAddFunction(userKey);

  // Asynchonously create roles
  async.parallel(parallel, function(error) {
    if (error) {
      throw error;
    } else {
      callback(null, users);
    }
  });

};

/**
 * Imports applications from JSON file in database.
 *
 * @example
 *
 *     var  applications = { // Define applications to import
 *       "coreApplicationsGuest": { // not used internally
 *         "name": "core-applications-guest" // Application name
 *         "scopes": [ // List of scope ids for the application
 *           "video" // Scope
 *         ]
 *       }
 *     };
 *
 *     loader.importApplications(applications, function(error, applications){
 *       console.log('Applications imported into database');
 *     });
 *
 * @param {Object} applications Applications description object
 * @return {Function} Function to call when all applications are imported
 */
module.exports.importApplications = function(applications, callback) {
  var parallel = [];
  var clientModel = new ClientModel();

  // Create function for async to add an application to the database
  function createAddFunction(applicationKey) {
    var application = applications[applicationKey];

    parallel.push(function(callback) {
      clientModel.add(application, callback);
    });
  }

  // Create functions to add applications with async
  for (var applicationKey in applications)
    createAddFunction(applicationKey);

  // Asynchonously create applications
  async.parallel(parallel, function(error) {
    if (error) {
      throw error;
    } else {
      callback(null, applications);
    }
  });

};