'use strict';

import _ from 'underscore';
import async from 'async';
import logger from '@adexchange/aeg-logger';

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
				(membership, cb) => {
					cb(membership.group.status === 'ENABLED');
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
	 * @param {Account) account
	 * @param {function} callback
	 */
	expand: function (expand, account, accountCallback) {

		async.parallel([
			function (cb) {
				if (!expand.apiKeys) {
					return cb();
				}

				account.getApiKeys(function (err, apiKeys) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s api keys.');
						return accountCallback(err);
					}

					account.apiKeys = apiKeys;
					cb();
				});
			},
			function (cb) {
				if (!expand.customData) {
					return cb();
				}

				account.getCustomData(function (err, customData) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s custom data.');
						return accountCallback(err);
					}

					account.customData = customData;
					cb();
				});
			},
			function (cb) {
				if (!expand.directory) {
					return cb();
				}

				account.getDirectory(function (err, directory) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s directory.');
						return accountCallback(err);
					}

					account.directory = directory;
					cb();
				});
			},
			function (cb) {
				if (!expand.groups) {
					return cb();
				}

				account.getGroups(function (err, groups) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s groups.');
						return accountCallback(err);
					}

					account.groups = groups;
					cb();
				});
			},
			function (cb) {
				if (!expand.groupMemberships) {
					return cb();
				}

				account.getGroupMemberships(function (err, groupMemberships) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s group memberships.');
						return accountCallback(err);
					}

					account.groupMemberships = groupMemberships;
					cb();
				});
			},
			function (cb) {
				if (!expand.providerData) {
					return cb();
				}

				account.getProviderData(function (err, providerData) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s provider data.');
						return accountCallback(err);
					}

					account.providerData = providerData;
					cb();
				});
			},
			function (cb) {
				if (!expand.tenant) {
					return cb();
				}

				account.getTenant(function (err, tenant) {
					if (err) {
						logger.info('Couldn\'t expand ' + account.email + '\'s tenant.');
						return accountCallback(err);
					}

					account.tenant = tenant;
					cb();
				});
			}
		], function (err) {
			if (err) {
				logger.info(err);
			}

			accountCallback(null, account);
		});
	}

};