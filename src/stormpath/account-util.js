'use strict';

import _ from 'lodash';
import async from 'async';

/**
 * Manages accounts
 */
export default {
	/**
	 * Returns an array of enabled group names that an account is associated too
	 * @param {Object} account
	 * @param {function} callback
	 */
	getGroupNamesFromMembership: function getGroupNamesFromMembership(account, callback) {
		account.getGroupMemberships({expand: 'group'}, function (err, memberships) {

			if (err) {
				return callback(err);
			}

			memberships.filter(
				(membership, callback) => {
					callback(membership.group.status === 'ENABLED');
				},
				function (enabledMemberships) {
					var groups = _.map(enabledMemberships, function (membership) {
						return membership.group.name;
					});
					callback(null, groups);
				});
		});
	},

	/**
	 * Expands an account
	 * @param {Object} expand - Properties to expand
	 * @param {Object} account
	 * @param {function} accountCallback
	 */
	expand: function (expand, account, accountCallback) {

		let localExpand = expand ? expand : {};

		async.parallel([
			function (callback) {
				if (!localExpand.apiKeys) {
					return callback();
				}

				account.getApiKeys(function (err, apiKeys) {
					if (err) {
						return accountCallback(err);
					}

					account.apiKeys = apiKeys;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.customData) {
					return callback();
				}

				account.getCustomData(function (err, customData) {
					if (err) {
						return accountCallback(err);
					}

					account.customData = customData;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.directory) {
					return callback();
				}

				account.getDirectory(function (err, directory) {
					if (err) {
						return accountCallback(err);
					}

					account.directory = directory;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.groups) {
					return callback();
				}

				account.getGroups(function (err, groups) {
					if (err) {
						return accountCallback(err);
					}

					account.groups = groups;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.groupMemberships) {
					return callback();
				}

				account.getGroupMemberships(function (err, groupMemberships) {
					if (err) {
						return accountCallback(err);
					}

					account.groupMemberships = groupMemberships;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.providerData) {
					return callback();
				}

				account.getProviderData(function (err, providerData) {
					if (err) {
						return accountCallback(err);
					}

					account.providerData = providerData;
					callback();
				});
			},
			function (callback) {
				if (!localExpand.tenant) {
					return callback();
				}

				account.getTenant(function (err, tenant) {
					if (err) {
						return accountCallback(err);
					}

					account.tenant = tenant;
					callback();
				});
			}
		], function (err) {
			accountCallback(err, account);
		});
	}

};