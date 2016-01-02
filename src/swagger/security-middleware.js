'use strict';

import securityApi from '../api/security-api';
import { token } from '../stormpath';
import { logger } from '../logger-facade';

/**
 * Middleware to populate the account details to the request
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
export default (req, res, next) => {
	if (req.headers.authorization) {
		securityApi.setToken(token.parseTokenFromAuthorization(req.headers.authorization));
		securityApi.getAccount()
			.then((result) => {
				req.account = result.body.account;
				next();
			})
			.fail((err) => {
				logger.errorWithMessage('securityMiddleware: could not get account for authorization', err);
				next();
			});
	} else {
		next();
	}
};