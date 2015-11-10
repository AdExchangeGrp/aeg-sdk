'use strict';

var securityApi = require('../api/securityApi');
var helpers = require('express-stormpath/lib/helpers');
var nJwt = require('nJwt');
var config = require('config');

var stormpathConfig = config.get('stormpath');

module.exports = (req, res, next) => {

	let client = req.app.get('stormpathClient');

	securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd', scope: 'test'})
		.then((result) => {

			var accessToken = nJwt.verify(result.body.accessToken, stormpathConfig.apiKey.secret);
			var refreshToken = nJwt.verify(result.body.refreshToken, stormpathConfig.apiKey.secret);

			client.getAccount(accessToken.body.sub, (err, account) => {

				if (err) {
					return next(err);
				}

				helpers.loginResponder(
					{
						accessToken: accessToken,
						refreshToken: refreshToken
					}, account, req, res);
			});
		})
		.fail((err) => {
			next(err);
		});
};