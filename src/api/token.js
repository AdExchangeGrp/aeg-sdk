'use strict';

import { EventEmitter } from 'events';
import config  from 'config';
import securityApi from './securityApi';
import { token } from '../stormpath';
import ApiError from './apiError';

class Token extends EventEmitter {

	fetch(app, callback) {
		let appConfig = config.get('app');
		let accessToken = app.get('accessToken');

		if (accessToken) {
			securityApi.setToken(accessToken);
			securityApi.authorize({scopes: 'affiliate:service', strict: false})
				.then(() => {
					token.willExpire(accessToken, 30, (err) => {
						if (err) {
							this.emit('debug', 'service level api token will expire');
							refreshToken(callback);
						} else {
							callback(null, accessToken);
						}
					});
				})
				.fail(() => {
					this.emit('debug', 'service level api token has expired');
					refreshToken(callback);
				});

		} else {
			this.emit('debug', 'service level api token not found');
			refreshToken(callback);
		}

		function refreshToken(callback) {

			this.emit('debug', 'refresh service level api token');

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
					this.emit('error', 'failed to refresh service level api token', err);
					callback(err);
				});
		}

	}

	callApi(app, api, apiCall, apiCallOptions, callback) {
		this.get(app, (err, token) => {
			if (err) {
				this.emit('error', 'Could not get api token');
				callback(err);
			} else {
				api.setToken(token);
				api[apiCall](apiCallOptions)
					.then((result) => {
						callback(null, result.body);
					})
					.fail((err) => {
						callback(new ApiError(err));
					});
			}
		});
	}

}

export default new Token();