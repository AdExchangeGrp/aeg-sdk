'use strict';

let _ = require('underscore');

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
	}
};