'use strict';

import securityApi from '../api/securityApi';
import logger from '@adexchange/aeg-logger';

/**
 * Middleware to populate the account details to the request
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
	if (req.headers.authorization) {
		securityApi.getAccount()
			.then((result) => {
				req.account = result.body.account;
				next();
			})
			.fail((err) => {
				logger.warn('Could not get account for authorization');
				next();
			});
	} else {
		next();
	}
};