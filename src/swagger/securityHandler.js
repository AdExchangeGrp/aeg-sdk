'use strict';

import securityApi from '../api/securityApi';
import { UnauthorizedError } from './';

/**
 * Authorize requests against the security service
 * @param {Request} req
 * @param def
 * @param {String[]]} routeScopes
 * @param {function} callback
 */
export default (req, def, routeScopes, callback) => {
	securityApi.setToken(req.headers.authorization);
	securityApi.authorize({scopes: routeScopes})
		.then((result) => {
			callback();
		})
		.fail((err) => {
			callback(new UnauthorizedError(err.message));
		});
};