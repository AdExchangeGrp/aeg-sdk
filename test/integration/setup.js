'use strict';

import securityApi from '../../src/api/securityApi';

export default  {

	getAdminPasswordToken: function (callback) {
		this.getPasswordToken('test-admin@test.com', 'Pa$$w0rd', {
			scopes: ['platform:admin'],
			fetchAccount: true
		}, callback);
	},

	getPasswordToken: function (username, password, options, callback) {

		let req = {
			username: username, password: password
		};

		if (options.scopes && options.scopes.length) {
			req.scope = options.scopes.join(',');
		}

		if (options.fetchAccount) {
			req.fetchAccount = options.fetchAccount;
		}

		if (options.searchTerm) {
			req.searchTerm = options.searchTerm;
		}

		if (options.searchValue) {
			req.searchValue = options.searchValue;
		}

		securityApi.passwordToken(req)
			.then((result) => {
				callback(null, {
					accessToken: result.body.accessToken,
					refreshToken: result.body.refreshToken,
					account: result.body.account
				});
			})
			.fail((err) => {
				callback(err);
			});
	},

	revokePasswordToken: (accessToken, refreshToken, callback) => {
		securityApi.setToken(accessToken);
		securityApi.revokePasswordToken({refreshToken: refreshToken})
			.then(() => {
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

};