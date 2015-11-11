'use strict';

//noinspection NodeRequireContents
let logger = require('@adexchange/aeg-logger');
let _ = require('underscore');
let config = require('config');
let UnauthorizedError = require('../errors/unauthorizedError');
let stormpath = require('stormpath');
let jwt = require('njwt');

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

	//check for the authorization header
	if (!req.headers.authorization) {
		return callback(new UnauthorizedError('Invalid token'));
	}

	//check to see if the JWT it valid and extract any scopes
	jwt.verify(parseTokenFromAuthorization(req.headers.authorization), stormpathConfig.apiKey.secret, (err, expandedJwt) => {

		if (err) {
			return callback(new UnauthorizedError('Invalid token'));
		} else {

			let tokenScopes = parseScopesFromJwt(expandedJwt);

			if (isPasswordToken(expandedJwt)) {
				authorizePasswordToken(req, routeScopes, tokenScopes, callback);
			} else {
				authorizeApiToken(req, routeScopes, tokenScopes, callback);
			}
		}
	});
};

/**
 * Parses the token from the authorization header
 * @param {string} authorization
 * @returns {*}
 */
function parseTokenFromAuthorization(authorization) {
	if (!authorization) {
		return '';
	}
	let parts = authorization.split(' ');
	if (parts.length) {
		return parts[1];
	} else {
		return '';
	}
}

/**
 * Parses an array of scopes from a JWT token
 * @param {njwt} jwt
 * @returns {*}
 */
function parseScopesFromJwt(jwt) {
	return jwt.body.scope ? jwt.body.scope.split(' ') : [];
}

/**
 * Determines whether the token is the result of a password OAUTH flow
 * @param {njwt} jwt
 */
function isPasswordToken(jwt) {
	return jwt.body.sub.match(/https:\/\/api.stormpath.com/);
}

/**
 * Authorizes a password token OAUTH flow
 * @param {Request} req
 * @param {String[]} routeScopes
 * @param {String[]} tokenScopes
 * @param {function} callback
 */
function authorizePasswordToken(req, routeScopes, tokenScopes, callback) {

	let application = req.app.get('stormpathApplication');

	let authenticator = new stormpath.OAuthAuthenticator(application);

	authenticator.authenticate({
		headers: {authorization: req.headers.authorization}
	}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		result.getAccount((err, account) => {

			if (err) {
				return callback(new UnauthorizedError('Could not retrieve account'));
			}

			if (account.status !== 'ENABLED') {
				return callback(new UnauthorizedError('Account is not active'));
			}

			logger.info('Scopes', {routeScopes: routeScopes, tokenScopes: tokenScopes});

			if (routeScopes && routeScopes.length > 0) {
				if (!_.intersection(routeScopes, tokenScopes).length) {
					return callback(new UnauthorizedError('Account does not have the required scopes'));
				}
			}

			callback();
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

	application.authenticateApiRequest({request: req}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		result.getAccount((err, account) => {

			if (err) {
				return callback(new UnauthorizedError('Could not retrieve account'));
			}

			if (account.status !== 'ENABLED') {
				return callback(new UnauthorizedError('Account is not active'));
			}

			logger.info('Scopes', {routeScopes: routeScopes, tokenScopes: tokenScopes});

			if (routeScopes && routeScopes.length > 0) {
				if (!_.intersection(routeScopes, tokenScopes).length) {
					return callback(new UnauthorizedError('Account does not have the required scopes'));
				}
			}

			callback();
		});
	});
}