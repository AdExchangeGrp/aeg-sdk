'use strict';

//noinspection NodeRequireContents
let logger = require('@adexchange/aeg-logger');
let _ = require('underscore');
let config = require('config');
let UnauthorizedError = require('../errors/unauthorizedError');
let stormpath = require('stormpath');
let jwt = require('njwt');
let token = require('../stormpath/token');
let expandAccount = require('express-stormpath/lib/helpers/expand-account');

let stormpathConfig = config.get('stormpath');

/**
 * Authenticates API requests using OAUTH JWT tokens
 * @param {Request} req
 * @param def
 * @param {String[]} routeScopes - scopes defined in the swagger spec
 * @param {function} callback
 * @returns {*}
 */
module.exports = (req, def, routeScopes, callback) => {

	//check for the Authorization header
	if (!req.headers.Authorization) {
		return callback(new UnauthorizedError('Invalid token'));
	}

	//check to see if the JWT it valid and extract any scopes
	jwt.verify(token.parseTokenFromAuthorization(req.headers.Authorization), stormpathConfig.apiKey.secret, (err, expandedJwt) => {

		if (err) {
			return callback(new UnauthorizedError('Invalid token'));
		} else {

			let tokenScopes = token.parseScopesFromJwt(expandedJwt);

			if (token.isPasswordToken(expandedJwt)) {
				authorizePasswordToken(req, routeScopes, tokenScopes, callback);
			} else {
				authorizeApiToken(req, routeScopes, tokenScopes, callback);
			}
		}
	});
};

/**
 * Authorizes a password token OAUTH flow
 * @param {Request} req
 * @param {String[]} routeScopes
 * @param {String[]} tokenScopes
 * @param {function} callback
 */
function authorizePasswordToken(req, routeScopes, tokenScopes, callback) {

	let application = req.app.get('stormpathApplication');
	let client = req.app.get('stormpathClient');

	let authenticator = new stormpath.OAuthAuthenticator(application);

	authenticator.authenticate({
		headers: {Authorization: req.headers.Authorization}
	}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		client.getAccount(result.account.href, (err, account) => {

			if (err) {
				return callback(new UnauthorizedError('Could not retrieve account'));
			}

			if (account.status !== 'ENABLED') {
				return callback(new UnauthorizedError('Account is not active'));
			}

			expandAccount(req.app, account, (err, expandedAccount) => {

				if (err) {
					return callback(new UnauthorizedError('Could not retrieve account'));
				}

				req.account = expandedAccount;

				logger.info('Scopes', {routeScopes: routeScopes, tokenScopes: tokenScopes});

				if (routeScopes && routeScopes.length > 0) {
					if (!_.intersection(routeScopes, tokenScopes).length) {
						return callback(new UnauthorizedError('Account does not have the required scopes'));
					}
				}

				callback();
			});
		});
	});
}

/**
 * Authorizes a client token OAUTH flow
 * @param {Request} req
 * @param {String[]} routeScopes
 * @param {String[]} tokenScopes
 * @param {function} callback
 */
function authorizeApiToken(req, routeScopes, tokenScopes, callback) {

	let application = req.app.get('stormpathApplication');
	let client = req.app.get('stormpathClient');

	application.authenticateApiRequest({request: req}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		client.getAccount(result.account.href, (err, account) => {

			if (err) {
				return callback(new UnauthorizedError('Could not retrieve account'));
			}

			if (account.status !== 'ENABLED') {
				return callback(new UnauthorizedError('Account is not active'));
			}

			expandAccount(req.app, account, (err, expandedAccount) => {

				if (err) {
					return callback(new UnauthorizedError('Could not retrieve account'));
				}

				req.account = expandedAccount;

				logger.info('Scopes', {routeScopes: routeScopes, tokenScopes: tokenScopes});

				if (routeScopes && routeScopes.length > 0) {
					if (!_.intersection(routeScopes, tokenScopes).length) {
						return callback(new UnauthorizedError('Account does not have the required scopes'));
					}
				}

				callback();
			});
		});
	});
}