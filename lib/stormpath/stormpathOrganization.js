'use strict';

let async = require('async');

module.exports = {

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