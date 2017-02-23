'use strict';

/**
 * @module core-models
 */

var util = require('util');
var shortid = require('shortid');
var openVeoApi = require('@openveo/api');
var permissionLoader = process.require('app/server/loaders/permissionLoader.js');
var storage = process.require('app/server/storage.js');

/**
 * Defines a GroupModel to manipulate groups.
 *
 * @class GroupModel
 * @extends EntityModel
 * @constructor
 * @param {GroupProvider} provider The entity provider
 */
function GroupModel(provider) {
  GroupModel.super_.call(this, provider);
}

module.exports = GroupModel;
util.inherits(GroupModel, openVeoApi.models.EntityModel);

/**
 * Adds a new group.
 *
 * Each time a new group is added, 3 new permissions are created create/update/delete and organized in a group of
 * permissions.
 *
 * @method add
 * @async
 * @param {Object} data Group's data
 * @param {String} data.name Group's name
 * @param {String} data.description Group's description
 * @param {String} [data.id] Group's id, if not specified id is generated
 * @param {Function} callback The function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Number** The total amount of items inserted
 *   - **Object** The added entity
 */
GroupModel.prototype.add = function(data, callback) {
  if (!data.name || !data.description)
    return callback(new Error('Both name and description are required to create a group'));

  var info = {
    id: data.id || shortid.generate(),
    name: data.name,
    description: data.description
  };

  this.provider.add(info, function(error, insertCount, documents) {
    if (!error && insertCount) {
      var group = documents[0];
      var permissions = storage.getPermissions() || [];
      var groupPermissions = permissionLoader.createGroupPermissions(group.id, group.name);

      // Add new group permissions to the list of permissions
      // The last group must stay the last group, this is the group of orphaned permissions
      permissions.splice(permissions.length - 1, 0, groupPermissions);

      storage.setPermissions(permissions);
    }

    if (callback)
      callback(error, insertCount, documents && documents[0]);
  });
};

/**
 * Updates a group.
 *
 * Each time a group is modified, the list of permissions is updated.
 *
 * @method update
 * @async
 * @param {String} id The id of the entity to update
 * @param {Object} data Group's data
 * @param {String} data.name Group's name
 * @param {String} data.description Group's description
 * @param {Function} callback The function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Number** The number of updated items
 */
GroupModel.prototype.update = function(id, data, callback) {
  var info = {};
  if (data.name)
    info.name = data.name;
  if (data.description)
    info.description = data.description;

  this.provider.update(id, info, function(error, updatedCount) {
    if (!error && updatedCount) {
      var permissions = storage.getPermissions();

      // Update permission
      permissions.forEach(function(permission) {
        if (permission.groupId === id && info.name)
          permission.label = info.name;
      });

    }

    if (callback)
      callback(error, updatedCount);
  });
};

/**
 * Removes one or several groups.
 *
 * Each time a group is removed, the list of permissions is updated.
 *
 * @method remove
 * @async
 * @param {String|Array} ids Id(s) of the document(s) to remove from the collection
 * @param {Function} callback The function to call when it's done
 *   - **Error** The error if an error occurred, null otherwise
 *   - **Number** The number of deleted entities
 */
GroupModel.prototype.remove = function(ids, callback) {
  this.provider.remove(ids, function(error, deletedCount) {
    var permissions = storage.getPermissions();

    if (permissions) {
      permissions = permissions.filter(function(permission) {
        return (ids.indexOf(permission.groupId) === -1);
      });

      storage.setPermissions(permissions);
    }

    if (callback)
      callback(error, deletedCount);
  });
};
