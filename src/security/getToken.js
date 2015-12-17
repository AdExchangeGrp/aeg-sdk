'use strict';

import { securityApi } from '../api';
import { token } from '../stormpath';
import config  from 'config';
import logger from '@adexchange/aeg-logger';

/**
 * Gets a valid security token from the security API
 * Checks for a current token and tries to refresh it if it expires
 * @param {Application} app
 * @param {function} callback
 */
export default (app, callback) => {

	let appConfig = config.get('app');
	let accessToken = app.get('accessToken');

	if (accessToken) {
		securityApi.setToken(accessToken);
		securityApi.authorize({scopes: 'affiliate:service', strict: false})
			.then(() => {
				token.willExpire(accessToken, 30, (err) => {
					if (err) {
						logger.info('Service level api token will expire');
						refreshToken(callback);
					} else {
						callback(null, accessToken);
					}
				});
			})
			.fail(() => {
				logger.info('Service level api token has expired');
				refreshToken(callback);
			});

	} else {
		logger.info('Service level api token not found');
		refreshToken(callback);
	}

	function refreshToken(callback) {

		logger.info('Refresh service level api token');

		securityApi.apiToken({
				Authorization: 'Basic ' + new Buffer(appConfig.apiKey.id + ':' + appConfig.apiKey.secret).toString('base64'),
				grantType: 'client_credentials',
				scope: 'affiliate:service'
			})
			.then((result) => {
				app.set('accessToken', result.body.accessToken);
				callback(null, result.body.accessToken);
			})
			.fail((err) => {
				callback(err);
			});
	}

};