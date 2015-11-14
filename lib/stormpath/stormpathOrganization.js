'use strict';

let async = require('async');

module.exports = {

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
				client.getDirectory(organization.defaultAccountStoreMapping.accountStore.href, callback);
			}
		], callback);
	}

};