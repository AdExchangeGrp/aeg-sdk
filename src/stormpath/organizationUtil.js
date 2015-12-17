'use strict';

import async from 'async';

/**
 * Manages organizations
 */
export default {

	/**
	 * Gets the default directory for an organization
	 * @param {Client} client
	 * @param {string} href
	 * @param callback
	 */
	getOrganizationDefaultAccountStore: (client, href, callback) => {
		async.waterfall([
			(callback) => {
				client.getOrganization(href, {expand: 'defaultAccountStoreMapping'}, callback);
			},
			(organization, callback) => {
				client.getDirectory(organization.defaultAccountStoreMapping.accountStore.href, (err, directory) => {
					callback(err, {organization: organization, directory: directory});
				});
			}
		], callback);
	}

};