'use strict';

import logger from '@adexchange/aeg-logger';
import _ from 'underscore';
import config from 'config';
import { UnauthorizedError } from '../errors';
import stormpath from 'stormpath';
import jwt from 'njwt';
import { token } from '../stormpath';
import { expandAccount } from 'express-stormpath/lib/helpers';
import { accountUtil } from '../stormpath';

const stormpathConfig = config.get('stormpath');
const invalidToken = 'Invalid token';
const expiredToken = 'Expired token';
const permissionDenied = 'Permission denied';

/**
 * Authenticates API requests using OAUTH JWT tokens
 * @param {Request} req
 * @param def
 * @param {String[]} routeScopes - scopes defined in the swagger spec
 * @param {function} callback
 * @returns {*}
 */
export default (req, def, routeScopes, callback) => {

	logger.debug(`Authorizing ${req.swagger.apiPath}`);

	//check for the Authorization header
	if (!req.headers.authorization) {
		return callback(new UnauthorizedError(invalidToken));
	}

	//check to see if the JWT it valid and extract any scopes
	jwt.verify(token.parseTokenFromAuthorization(req.headers.authorization), stormpathConfig.apiKey.secret, (err, expandedJwt) => {

		if (err) {

			if (err.message === 'Jwt is expired') {
				return callback(new UnauthorizedError(expiredToken));
			} else {
				return callback(new UnauthorizedError(invalidToken));
			}

		} else {

			let tokenScopes = token.parseScopesFromJwt(expandedJwt);

			if (token.isPasswordToken(expandedJwt)) {
				authorizePasswordToken(req, routeScopes, callback);
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
 * @param {function} callback
 */
function authorizePasswordToken(req, routeScopes, callback) {

	let application = req.app.get('stormpathApplication');

	let authenticator = new stormpath.OAuthAuthenticator(application);

	authenticator.authenticate({
		headers: {authorization: req.headers.authorization}
	}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		expandAndVerifyAccount(req, result, (err, expandedAccount) => {

			if (err) {
				return callback(err);
			}

			accountUtil.getGroupNamesFromMembership(expandedAccount, (err, groups) => {

				if (err) {
					return callback(new UnauthorizedError(permissionDenied));
				} else {

					logger.debug('API Token Scopes', {
						routeScopes: routeScopes,
						validScopes: groups
					});

					if (routeScopes && routeScopes.length > 0) {
						if (!_.intersection(routeScopes, groups).length) {
							return callback(new UnauthorizedError(permissionDenied));
						}
					}

					req.account = expandedAccount;
					callback();
				}
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

	application.authenticateApiRequest({request: req}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		expandAndVerifyAccount(req, result, (err, expandedAccount) => {

			if (err) {
				return callback(err);
			}

			checkApiTokenScopesAgainstRoute(routeScopes, tokenScopes, expandedAccount, (err) => {
				if (err) {
					return callback(new UnauthorizedError(permissionDenied));
				} else {
					req.account = expandedAccount;
					callback();
				}
			});
		});
	});
}

/**
 * Expand and verify the account
 * @param {AuthenticationResult} authenticationResult
 * @param {function} callback
 */
function expandAndVerifyAccount(req, authenticationResult, callback) {

	let client = req.app.get('stormpathClient');

	client.getAccount(authenticationResult.account.href, (err, account) => {

		if (err) {
			return callback(new UnauthorizedError('Could not retrieve account'));
		}

		if (account.status !== 'ENABLED') {
			return callback(new UnauthorizedError('Account is not active'));
		}

		expandAccount(req.app, account, callback);
	});
}

/**
 * Verify an accounts scopes against the route scopes
 * @param {String[]} routeScopes
 * @param {String[]} tokenScopes
 * @param {function} callback
 */
function checkApiTokenScopesAgainstRoute(routeScopes, tokenScopes, account, callback) {
	checkApiTokenScopesAgainstAccount(tokenScopes, account, (err, validScopes) => {

		if (err) {
			logger.error(err);
			validScopes = [];
		}

		logger.debug('API Token Scopes', {
			routeScopes: routeScopes,
			tokenScopes: tokenScopes,
			validScopes: validScopes
		});

		if (routeScopes && routeScopes.length > 0) {
			if (!_.intersection(routeScopes, validScopes).length) {
				return callback(new UnauthorizedError(permissionDenied));
			}
		}

		callback();
	});

	/**
	 * Verify the token scope list is valid for the account
	 * @param {String[]} scopes
	 * @param {Account} account
	 * @param {function} callback
	 */
	function checkApiTokenScopesAgainstAccount(scopes, account, callback) {
		accountUtil.getGroupNamesFromMembership(account, (err, groups) => {
			if (err) {
				callback(err);
			} else {
				callback(null, _.intersection(scopes, groups));
			}
		});
	}
}