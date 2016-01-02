'use strict';

import { EventEmitter } from 'events';
import config  from 'config';
import securityApi from './security-api';
import { token } from '../stormpath';
import ApiError from './api-error';

class Token extends EventEmitter {

	fetch(app, callback) {
		let accessToken = app.get('accessToken');

		if (accessToken) {
			securityApi.setToken(accessToken);
			securityApi.authorize({scopes: 'affiliate:service', strict: false})
				.then(() => {
					token.willExpire(accessToken, 30, (err) => {
						if (err) {
							this.emit('debug', {message: 'service level api token will expire'});
							this.refreshToken(app, callback);
						} else {
							callback(null, accessToken);
						}
					});
				})
				.fail(() => {
					this.emit('debug', {message: 'service level api token has expired'});
					this.refreshToken(app, callback);
				});

		} else {
			this.emit('debug', {message: 'service level api token not found'});
			this.refreshToken(app, callback);
		}
	}

	refreshToken(app, callback) {

		let appConfig = config.get('app');

		this.emit('debug', {message: 'refresh service level api token'});

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
				this.emit('error', {message: 'failed to refresh service level api token', data: err});
				callback(err);
			});
	}

	callApi(app, api, apiCall, apiCallOptions, callback) {
		this.fetch(app, (err, token) => {
			if (err) {
				this.emit('error', {message: 'Could not get api token', data: err});
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