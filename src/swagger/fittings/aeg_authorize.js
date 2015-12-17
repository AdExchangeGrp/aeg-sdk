'use strict';

import config from 'config';
import { parseParam, PermissionDeniedError, UnauthorizedError } from '../';
import { token } from '../../stormpath';
import _ from 'lodash';
import jwt from 'njwt';

/**
 * Swagger bagpipes fitting to perform granular authorizations
 * @returns {Function}
 */
export default () => {

	const invalidToken = 'Invalid token';
	const expiredToken = 'Expired token';
	const appConfig = config.get('app');
	const stormpathConfig = config.get('stormpath');

	return (context, callback) => {

		const operation = context.request.swagger.operation;

		if (operation['x-aeg-authorize']) {

			var authorize = operation['x-aeg-authorize'];
			let adminScopes = _.pluck(appConfig.authorizations.adminScopes, 'name');

			switch (authorize.type) {
				case 'adminOrOwner':

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
				case 'affiliate':

					let affiliateId = parseParam(context.request, authorize.parameter);

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
									if (expandedJwt.body.organization) {
										if (affiliateId === expandedJwt.body.organization.nameKey) {
											callback();
										} else {
											callback(new PermissionDeniedError());
										}
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