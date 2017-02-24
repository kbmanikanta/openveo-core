'use strict';

/**
 * @module core-providers
 */

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Defines a UserProvider to get and save back end users.
 *
 * @class UserProvider
 * @extends EntityProvider
 * @constructor
 * @param {Database} database The database to interact with
 */
function UserProvider(database) {
  UserProvider.super_.call(this, database, 'core_users');
}

module.exports = UserProvider;
util.inherits(UserProvider, openVeoApi.providers.EntityProvider);

/**
 * Gets a user by its credentials.
 *
 * @method getUserByCredentials
 * @async
 * @param {String} email The email of the user
 * @param {String} password The password of the user
 * @param {Function} callback Function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Object** The user
 */
UserProvider.prototype.getUserByCredentials = function(email, password, callback) {
  this.database.get(this.collection,
    {
      email: email,
      password: password
    },
    {
      password: 0
    },
    1, function(error, data) {
      callback(error, data && data[0]);
    });
};

/**
 * Gets a user by its email.
 *
 * @method getUserByEmail
 * @async
 * @param {String} email The email of the user
 * @param {Function} callback Function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Object** The user
 */
UserProvider.prototype.getUserByEmail = function(email, callback) {
  this.database.get(this.collection,
    {
      email: email
    },
    {
      password: 0
    },
    1, function(error, data) {
      callback(error, data && data[0]);
    });
};

/**
 * Gets a user without its paswword.
 *
 * @method getOne
 * @async
 * @param {String} id The user id
 * @param {Object} [filter] A MongoDB filter
 * @param {Function} callback Function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Object** The user
 */
UserProvider.prototype.getOne = function(id, filter, callback) {

  if (!filter) filter = {};
  filter.id = id;

  this.database.get(this.collection, filter,
    {
      password: 0
    },
    1, function(error, data) {
      callback(error, data && data[0]);
    });
};

/**
 * Creates users indexes.
 *
 * @method createIndexes
 * @async
 * @param {Function} callback Function to call when it's done with :
 *  - **Error** An error if something went wrong, null otherwise
 */
UserProvider.prototype.createIndexes = function(callback) {
  this.database.createIndexes(this.collection, [
    {key: {name: 1}, name: 'byName'},
    {key: {name: 'text'}, weights: {name: 1}, name: 'querySearch'}
  ], function(error, result) {
    if (result && result.note)
      process.logger.debug('Create users indexes : ' + result.note);

    callback(error);
  });
};
