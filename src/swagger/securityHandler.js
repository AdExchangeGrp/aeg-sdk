'use strict';

import securityApi from '../api/securityApi';
import { UnauthorizedError } from './';
import { token } from '../stormpath';

/**
 * Authorize requests against the security service
 * @param {Request} req
 * @param def
 * @param {String[]]} routeScopes
 * @param {function} callback
 */
export default (req, def, routeScopes, callback) => {

	var scopes = '';

	if (routeScopes && routeScopes.length) {
		scopes = routeScopes.join(',');
	}

	securityApi.setToken(token.parseTokenFromAuthorization(req.headers.authorization));
	securityApi.authorize({scopes: scopes})
		.then((result) => {
			callback();
		})
		.fail((err) => {
			callback(new UnauthorizedError(err.message));
		});
};