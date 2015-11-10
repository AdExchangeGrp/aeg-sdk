'use strict';

var securityApi = require('securityApi');
var helpers = require('express-stormpath/lib/helpers');

module.exports = (req, res, callback) => {

	let application = req.app.get('stormpathApplication');

	securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd', scope: 'test'})
		.then((result) => {
			helpers.expandAccount(application, result.body.account, (err, account) => {
				if (err) {
					return callback(err);
				}
				helpers.createSession(req, res, account, result.body.accessToken, result.body.refreshToken)
				callback();
			});
		})
		.fail((err) => {
			callback(err);
		});
};