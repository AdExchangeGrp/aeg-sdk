'use strict';

var securityApi = require('../api/securityApi');
var helpers = require('express-stormpath/lib/helpers');
var nJwt = require('nJwt');
var config = require('config');

var stormpathConfig = config.get('stormpath');

module.exports = (req, res, next) => {

	let client = req.app.get('stormpathClient');

	if (!req.body.username || !req.body.username) {
		next(new Error('Username and password required'));
	}

	securityApi.passwordToken({username: req.body.username, password: req.body.password})
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