'use strict';

import securityApi from '../api/securityApi';
import { token } from '../stormpath';
import logger from '@adexchange/aeg-logger';

/**
 * Middleware to populate the account details to the request
 * @param {Request} req
 * @param {Response} res
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
				logger.warn('securityMiddleware: could not get account for authorization');
				logger.error(err);
				next();
			});
	} else {
		next();
	}
};