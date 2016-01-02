'use strict';

import securityApi from '../api/security-api';
import { token } from '../stormpath';
import { EventEmitter } from 'events';

/**
 *  Middleware to populate the account details to the request
 */
class SecurityMiddleware extends EventEmitter {

	middleware() {

		var self = this;

		return (req, res, next) => {
			if (req.headers.authorization) {
				securityApi.setToken(token.parseTokenFromAuthorization(req.headers.authorization));
				securityApi.getAccount()
					.then((result) => {
						req.account = result.body.account;
						next();
					})
					.fail((err) => {
						self.emit('error', {message: 'could not get account for authorization', data: err});
						next();
					});
			} else {
				next();
			}
		};
	}
}

export default SecurityMiddleware;