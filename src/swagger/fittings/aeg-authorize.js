'use strict';

import config from 'config';
import { parseParam, PermissionDeniedError, UnauthorizedError } from '../';
import { token } from '../../stormpath';
import _ from 'lodash';
import jwt from 'njwt';
import { EventEmitter } from 'events';

/**
 * Swagger bagpipes fitting to perform granular authorizations
 */
class Authorize extends EventEmitter {

	fitting() {

		let self = this;

		const invalidToken = 'Invalid token';
		const expiredToken = 'Expired token';
		const appConfig = config.get('app');
		const stormpathConfig = config.get('stormpath');

		return (context, callback) => {

			const operation = context.request.swagger.operation;

			if (operation['x-aeg-authorize']) {

				var authorize = operation['x-aeg-authorize'];
				let adminScopes = _.pluck(appConfig.authorizations.adminScopes, 'name');

				self.emit('debug', {
					message: 'authorize',
					data: {type: authorize.type, parameter: authorize.parameter}
				});

				switch (authorize.type) {
					case 'adminOrOwner':

						self.emit('debug', {message: 'adminOrOwner'});

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
										let resourceId = parseParam(context.request, authorize.parameter);

										if (!resourceId) {
											resourceId = context.request.account.href;
										}

										if (resourceId === context.request.account.href) {
											callback();
										} else {
											callback(new PermissionDeniedError());
										}
									}
								}
							});
						break;
					case 'adminOrAffiliate':

						let affiliateId = parseParam(context.request, authorize.parameter);

						self.emit('debug', {message: 'adminOrAffiliate', data: {affiliateId: affiliateId}});

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

									self.emit('debug', {
										message: 'adminOrAffiliate', data: {
											tokenScopes: tokenScopes,
											adminScopes: adminScopes
										}
									});

									if (_.intersection(adminScopes, tokenScopes).length) {
										callback();
									} else {
										if (expandedJwt.body.organization) {

											self.emit('debug', {
												message: 'adminOrAffiliate',
												data: {organization: expandedJwt.body.organization}
											});

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
						this.self('debug', {message: 'type not found'});
						callback(new PermissionDeniedError());
						break;
				}
			} else {
				callback();
			}
		};
	}

}

export default Authorize;