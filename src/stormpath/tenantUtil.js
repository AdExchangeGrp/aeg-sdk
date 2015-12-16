'use strict';

import async from 'async';
import organizationUtil from './organizationUtil';

export default {

	/**
	 * Get an organization by name
	 * @param {Client} client
	 * @param {String} organization name
	 * @param {function} callback
	 */
	getOrganizationDefaultDirectoryByName: (client, name, callback) => {
		_getOrganizationDefaultDirectoryInternal(client, {name: name}, callback);
	},

	/**
	 * Get an organization by name key
	 * @param {Client} client
	 * @param {String} organization name key
	 * @param {function} callback
	 */
	getOrganizationDefaultDirectoryByNameKey: (client, nameKey, callback) => {
		_getOrganizationDefaultDirectoryInternal(client, {nameKey: nameKey}, callback);
	}

};

function _getOrganizationDefaultDirectoryInternal(client, search, callback) {
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
		},
		(organization, callback) => {
			organizationUtil.getOrganizationDefaultAccountStore(client, organization.href, callback);
		}
	], callback);
}