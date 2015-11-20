'use strict';

import securityApi from '../api/securityApi';
import helpers from 'express-stormpath/lib/helpers';
import njwt from 'njwt';
import config from 'config';
import Unauthorized from '../errors/unauthorizedError';
import async from 'async';

/**
 * Express route to login a user using security service
 * @param {Request} req
 * @param {Response} res
 * @param {string} loginUri - redirect on failed login
 */
export default (req, res, loginUri) => {

	let stormpathConfig = config.get('stormpath');

	let client = req.app.get('stormpathClient');

	if (!req.body.username || !req.body.password) {
		return processErrorResponse(req, res, 400, {message: 'Username and password required'});
	}

	securityApi.passwordToken({username: req.body.username, password: req.body.password})
		.then((result) => {

			var accessToken;
			var refreshToken;

			async.series([
				function (callback) {
					njwt.verify(result.body.accessToken, stormpathConfig.apiKey.secret, (err, expandedJwt) => {
						if (err) {
							return callback(err);
						}

						accessToken = expandedJwt;
						callback();
					});
				},
				function (callback) {
					njwt.verify(result.body.refreshToken, stormpathConfig.apiKey.secret, (err, expandedJwt) => {
						if (err) {
							return callback(err);
						}

						refreshToken = expandedJwt;
						callback();
					});
				}
			], function (err) {

				if (err) {
					return processErrorResponse(req, res, 500, {message: err.message});
				}

				client.getAccount(accessToken.body.sub, (err, account) => {

					if (err) {
						return processErrorResponse(req, res, 500, {message: err.message});
					}

					helpers.loginResponder(
						{
							accessToken: accessToken,
							refreshToken: refreshToken
						}, account, req, res);
				});
			});
		})
		.fail((err) => {
			var result = new Unauthorized(err.body);
			return processErrorResponse(req, res, 401, result.message);
		});

	function processErrorResponse(req, res, status, obj) {
		let accepts = req.accepts(['html', 'json']);
		if (accepts === 'json') {
			res.status(status).json(obj);
		} else {
			res.redirect(loginUri);
		}
	}
};