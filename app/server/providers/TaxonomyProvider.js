'use strict';

/**
 * @module core-providers
 */

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Defines a TaxonomyProvider to get and save taxonomies.
 *
 * @class TaxonomyProvider
 * @extends EntityProvider
 * @constructor
 * @param {Database} database The database to interact with
 */
function TaxonomyProvider(database) {
  TaxonomyProvider.super_.call(this, database, 'core_taxonomies');
}

module.exports = TaxonomyProvider;
util.inherits(TaxonomyProvider, openVeoApi.providers.EntityProvider);

/**
 * Creates taxonomies indexes.
 *
 * @method createIndexes
 * @async
 * @param {Function} callback Function to call when it's done with :
 *  - **Error** An error if something went wrong, null otherwise
 */
TaxonomyProvider.prototype.createIndexes = function(callback) {
  this.database.createIndexes(this.collection, [
    {key: {name: 1}, name: 'byName'},
    {key: {name: 'text'}, weights: {name: 1}, name: 'querySearch'}
  ], function(error, result) {
    if (result && result.note)
      process.logger.debug('Create taxonomies indexes : ' + result.note);

    callback(error);
  });
};
