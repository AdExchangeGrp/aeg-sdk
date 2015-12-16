'use strict';

import async from 'async';
import organizationUtil from './organizationUtil';

export default {

	/**
	 * Get an organization by name
	 * @param {Application} application
	 * @param {String} organization name
	 * @param {function} callback
	 */
	getOrganizationDefaultDirectoryByName: (client, name, callback) => {
		async.waterfall([
			(callback) => {
				client.getCurrentTenant(callback);
			},
			(tenant, callback) => {
				tenant.getOrganizations({name: name}, (err, organizations) => {
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

};