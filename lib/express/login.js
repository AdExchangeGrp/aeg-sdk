'use strict';

var securityApi = require('../api/securityApi');
var helpers = require('express-stormpath/lib/helpers');
var njwt = require('njwt');
var config = require('config');
var Unauthorized = require('../errors/unauthorizedError');
var stormpathAccount = require('../stormpath').stormpathAccount;

var stormpathConfig = config.get('stormpath');

/**
 * Express route to login a user using security service
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {

	let client = req.app.get('stormpathClient');

	if (!req.body.username || !req.body.password) {
		return processErrorResponse(req, res, 400, {message: 'Username and password required'});
	}

	securityApi.passwordToken({username: req.body.username, password: req.body.password})
		.then((result) => {

			var accessToken = njwt.verify(result.body.accessToken, stormpathConfig.apiKey.secret);
			var refreshToken = njwt.verify(result.body.refreshToken, stormpathConfig.apiKey.secret);

			client.getAccount(accessToken.body.sub, (err, account) => {

				if (err) {
					return processErrorResponse(req, res, 500, {message: err.message});
				}

				stormpathAccount.getGroupNamesFromMembership(account, (err, result) => {

					if (err) {
						return processErrorResponse(req, res, 500, {message: err.message});
					}

					if (result && result.length) {
						accessToken.body.scope = result.join(' ');
						accessToken.setSigningKey(stormpathConfig.apiKey.secret);
						let scopedToken = njwt.create(accessToken.body.toJSON(), stormpathConfig.apiKey.secret);
						scopedToken.header = accessToken.header;
						accessToken = scopedToken;
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
};

function processErrorResponse(req, res, status, obj) {
	let accepts = req.accepts(['html', 'json']);
	if (accepts === 'json') {
		return res.status(status).json(obj);
	} else {
		//todo:this should really redirect with a flash message or something
		return res.status(status).send(obj);
	}
}