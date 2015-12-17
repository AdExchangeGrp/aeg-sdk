'use strict';

import config from 'config';
import { parseParam, PermissionDeniedError, UnauthorizedError } from '../';
import { token } from '../stormpath';
import _ from 'lodash';
import jwt from 'njwt';

const invalidToken = 'Invalid token';
const expiredToken = 'Expired token';
const appConfig = config.get('app');
const stormpathConfig = config.get('stormpath');

export default () => {
	return (context, callback) => {
		const operation = context.request.swagger.operation;
		if (operation['x-aeg-authorize']) {
			var authorize = operation['x-aeg-authorize'];
			switch (authorize.type) {
				case 'adminOrOwner':

					let adminScopes = _.pluck(appConfig.authorizations.adminScopes, 'name');

					jwt.verify(
						token.parseTokenFromAuthorization(context.request.headers.authorization),
						stormpathConfig.apiKey.secret,
						(err, expandedJwt) => {
							if (err) {
								if (err.message === 'Jwt is expired') {
									callback(new UnauthorizedError(expiredToken));
								} else {
									callback(new UnauthorizedError(invalidToken));
								}
							} else {
								let tokenScopes = token.parseScopesFromJwt(expandedJwt);
								if (_.intersection(adminScopes, tokenScopes).length) {
									callback();
								} else {
									var resourceId = parseParam(context.request, authorize.parameter);
									if (resourceId === context.request.account.href) {
										callback();
									} else {
										callback(new PermissionDeniedError());
									}
								}
							}
						});
					break;
				default:
					callback(new PermissionDeniedError());
			}
		} else {
			callback();
		}
	};
};