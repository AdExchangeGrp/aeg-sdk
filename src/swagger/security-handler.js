'use strict';

import { UnauthorizedError, PermissionDeniedError } from './';
import { token } from '../stormpath';
import njwt from 'njwt';
import _ from 'lodash';
import config from 'config';
import { EventEmitter } from 'events';

const stormpathConfig = config.get('stormpath');
const invalidToken = 'Invalid token';
const expiredToken = 'Expired token';
const wrongEnvToken = 'Token environment mismatch';

class SecurityHandler extends EventEmitter {

	handler() {

		var self = this;

		return (req, def, routeScopes, callback) => {

			self.emit('debug', {message: req.url});

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

						if (token.parseEnvFromJwt(expandedJwt) !== process.env.NODE_ENV) {
							return callback(new UnauthorizedError(wrongEnvToken));
						}

						const authorizedScopes = expandedJwt.body.scope.split(' ');

						self.emit('debug', {
							message: 'API Token Scopes', data: {
								routeScopes: routeScopes,
								validScopes: authorizedScopes
							}
						});

						if (routeScopes && routeScopes.length) {
							if (_.intersection(routeScopes, authorizedScopes).length) {
								callback();
							} else {
								callback(new PermissionDeniedError());
							}
						} else {
							callback();
						}
					}
				});
		};
	}
}

export default SecurityHandler;