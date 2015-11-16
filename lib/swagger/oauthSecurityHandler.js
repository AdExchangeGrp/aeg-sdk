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
	if (!req.headers.authorization) {
		return callback(new UnauthorizedError('Invalid token'));
	}

	//check to see if the JWT it valid and extract any scopes
	jwt.verify(token.parseTokenFromAuthorization(req.headers.authorization), stormpathConfig.apiKey.secret, (err, expandedJwt) => {

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

	let authenticator = new stormpath.OAuthAuthenticator(application);

	authenticator.authenticate({
		headers: {authorization: req.headers.authorization}
	}, (err, result) => {

		if (err) {
			return callback(new UnauthorizedError());
		}

		handleAuthorizationRequest(req, result, routeScopes, tokenScopes, (err, expandedAccount) => {
			if (!err) {
				req.account = expandedAccount;
			}

			callback(err);
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

		handleAuthorizationRequest(req, result, routeScopes, tokenScopes, (err, expandedAccount) => {
			if (!err) {
				req.account = expandedAccount;
			}

			callback(err);
		});
	});
}

/**
 * Check an authorization request
 * @param {Request} request
 * @param {AuthenticationResult} authenticationResult
 * @param {String[]} routeScopes
 * @param {String[]} tokenScopes
 * @param {function} callback
 */
function handleAuthorizationRequest(req, authenticationResult, routeScopes, tokenScopes, callback) {

	let client = req.app.get('stormpathClient');

	client.getAccount(authenticationResult.account.href, (err, account) => {

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

			checkScopesAgainstRoute(routeScopes, tokenScopes, account, (err) => {
				callback(err, expandedAccount);
			});
		});
	});
}

/**
 * Verify an accounts scopes against the route scopes
 * @param routeScopes
 * @param tokenScopes
 * @param callback
 */
function checkScopesAgainstRoute(routeScopes, tokenScopes, account, callback) {
	checkScopesAgainstAccount(tokenScopes, account, (err, validScopes) => {

		if (err) {
			logger.error(err);
			validScopes = [];
		}

		logger.info('Scopes', {
			routeScopes: routeScopes,
			tokenScopes: tokenScopes,
			validScopes: validScopes
		});

		if (routeScopes && routeScopes.length > 0) {
			if (!_.intersection(routeScopes, validScopes).length) {
				return callback(new UnauthorizedError('Account does not have the required scopes'));
			}
		}

		callback();
	});
}

/**
 * Verify the token scope list is valid for the account
 * @param {String[]} scopes
 * @param {Account} account
 * @param {function} callback
 */
function checkScopesAgainstAccount(scopes, account, callback) {
	accountUtil.getGroupNamesFromMembership(account, (err, groups) => {
		if (err) {
			callback(err);
		} else {
			callback(null, _.intersection(scopes, groups));
		}
	});
}