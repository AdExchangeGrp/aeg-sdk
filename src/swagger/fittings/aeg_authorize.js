'use strict';

import config from 'config';
import { parseParam, PermissionDeniedError, UnauthorizedError } from '../';
import { token } from '../../stormpath';
import _ from 'lodash';
import jwt from 'njwt';
import logger from '@adexchange/aeg-logger';

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

			logger.debug('aeg_authorize:', {type: authorize.type, parameter: authorize.parameter});

			switch (authorize.type) {
				case 'adminOrOwner':

					logger.debug('aeg_authorize: adminOrOwner');

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
				case 'adminOrAffiliate':

					let affiliateId = parseParam(context.request, authorize.parameter);

					logger.debug('aeg_authorize: adminOrAffiliate', {affiliateId: affiliateId});

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

								logger.debug('aeg_authorize: adminOrAffiliate', {
									tokenScopes: tokenScopes,
									adminScopes: adminScopes
								});

								if (_.intersection(adminScopes, tokenScopes).length) {
									callback();
								} else {
									if (expandedJwt.body.organization) {

										logger.debug('aeg_authorize: adminOrAffiliate', {organization: expandedJwt.body.organization});

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
					logger.debug('aeg_authorize: type not found');
					callback(new PermissionDeniedError());
					break;
			}
		} else {
			callback();
		}
	};
};