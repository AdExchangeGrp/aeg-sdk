'use strict';

export default {
	/**
	 * Returns an array of group names that an account is associated too
	 * @param {Account} account
	 * @param {function} callback
	 */
	getGroupNamesFromMembership: (account, callback) => {
		account.getGroupMemberships({expand: 'group'}, (err, memberships) => {

			if (err) {
				return callback(err);
			}

			memberships.map((membership, cb) => {
				cb(null, membership.group.name);
			}, (err, groups) => {

				if (err) {
					return callback(err);
				}

				callback(null, groups);
			});
		});
	}
};