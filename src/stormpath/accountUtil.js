'use strict';

import _ from 'lodash';
import async from 'async';
import logger from '@adexchange/aeg-logger';

/**
 * Manages accounts
 */
export default {
	/**
	 * Returns an array of enabled group names that an account is associated too
	 * @param {Account} account
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
	 * @param {Account} account
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s api keys.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s custom data.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s directory.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s groups.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s group memberships.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s provider data.');
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
						logger.info('accountUtil: couldn\'t expand ' + account.email + '\'s tenant.');
						return accountCallback(err);
					}

					account.tenant = tenant;
					callback();
				});
			}
		], function (err) {

			if (err) {
				logger.errorWithMessage('accountUtil: error', err);
			}

			accountCallback(null, account);
		});
	}

};