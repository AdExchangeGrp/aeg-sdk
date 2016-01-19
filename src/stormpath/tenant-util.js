'use strict';

import async from 'async';
import organizationUtil from './organization-util';
import _ from 'lodash';

/**
 * Manages tenants
 */
export default {

	/**
	 * Get an organization by name
	 * @param {Object} client
	 * @param {String} name
	 * @param {function} callback
	 */
	getOrganizationDefaultDirectoryByName: (client, name, callback) => {
		_getOrganizationDefaultDirectoryInternal(client, {name: name}, callback);
	},

	/**
	 * Get an organization by name key
	 * @param {Object} client
	 * @param {String} nameKey
	 * @param {function} callback
	 */
	getOrganizationDefaultDirectoryByNameKey: (client, nameKey, callback) => {
		_getOrganizationDefaultDirectoryInternal(client, {nameKey: nameKey}, callback);
	},

	/**
	 * Get an organization by name
	 * @param {Object} client
	 * @param {string} name
	 * @param {function} callback
	 */
	getOrganizationByName: (client, name, callback) => {
		_getOrganization(client, {name: name}, callback);
	},

	/**
	 * Get an organization by name key
	 * @param {Object} client
	 * @param {string} nameKey
	 * @param {function} callback
	 */
	getOrganizationByNameKey: (client, nameKey, callback) => {
		_getOrganization(client, {nameKey: nameKey}, callback);
	},

	/**
	 * Search organizations
	 * @param {Object} client
	 * @param {Object} options
	 * @param {function} callback
	 */
	searchOrganizations: function (client, options, callback) {

		let args = Array.prototype.slice.call(arguments);
		client = args.shift();
		callback = args.pop();
		options = args.length > 0 ? args.shift() : null;

		async.waterfall([
			(callback) => {
				async.waterfall([
					(callback) => {
						client.getCurrentTenant(callback);
					},
					(tenant, callback) => {
						tenant.getOrganizations({expand: 'customData'}, (err, organizations) => {
							callback(err, organizations);
						});
					}
				], callback);
			},
			(organizations, callback) => {
				if (options && options.type) {
					organizations.filter((organization, callback) => {
						callback(organization.customData.type === options.type);
					}, (results) => {
						callback(null, results);
					});
				} else {
					organizations.concat((organization, callback) => {
						callback(null, organization);
					}, callback);
				}
			}
		], callback);
	}

};

/**
 * Search for an organization
 * @param {Object} client
 * @param {Object} search
 * @param {function} callback
 * @private
 */
function _getOrganization(client, search, callback) {
	async.waterfall([
		(callback) => {
			client.getCurrentTenant(callback);
		},
		(tenant, callback) => {
			tenant.getOrganizations(search, (err, organizations) => {
				if (err) {
					callback(err);
				} else {
					if (!organizations.items.length) {
						callback(new Error('Organization not found'));
					} else {
						callback(null, organizations.items[0]);
					}
				}
			});
		}
	], callback);
}

/**
 * Performs a search for an organization
 * @param {Object} client
 * @param {Object} search
 * @param {function} callback
 * @private
 */
function _getOrganizationDefaultDirectoryInternal(client, search, callback) {
	async.waterfall([
		(callback) => {
			_getOrganization(client, search, callback);
		},
		(organization, callback) => {
			organizationUtil.getOrganizationDefaultAccountStore(client, organization.href, callback);
		}
	], callback);
}