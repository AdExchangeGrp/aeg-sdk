'use strict';

import { UnauthorizedError, PermissionDeniedError } from './';
import { token } from '../stormpath';
import njwt from 'njwt';
import _ from 'underscore';
import config from 'config';
import logger from '@adexchange/aeg-logger';

const stormpathConfig = config.get('stormpath');
const invalidToken = 'Invalid token';
const expiredToken = 'Expired token';
const permissionDenied = 'Permission denied';

/**
 * Authorize requests against the security service
 * @param {Request} req
 * @param def
 * @param {String[]]} routeScopes
 * @param {function} callback
 */
export default (req, def, routeScopes, callback) => {

	logger.debug(`Authorizing ${req.swagger.apiPath}`);

	let scopes = '';

	if (routeScopes && routeScopes.length) {
		scopes = routeScopes.join(',');
	}

	njwt.verify(
		token.parseTokenFromAuthorization(req.headers.authorization),
		stormpathConfig.apiKey.secret,
		(err, expandedJwt) => {
			if (err) {

				if (err.message === 'Jwt is expired') {
					callback(new UnauthorizedError(expiredToken));
				} else {
					callback(new UnauthorizedError(invalidToken));
				}

			} else {

				let authorizedScopes = expandedJwt.body.scope.split(',');

				logger.debug('API Token Scopes', {
					routeScopes: routeScopes,
					validScopes: authorizedScopes
				});

				if (routeScopes && routeScopes.length) {
					if (_.intersection(routeScopes, authorizedScopes).length) {
						callback();
					} else {
						callback(new PermissionDeniedError(permissionDenied));
					}
				} else {
					callback();
				}
			}
		});
};