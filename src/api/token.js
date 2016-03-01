'use strict';

import { EventEmitter } from 'events';
import config  from 'config';
import securityApi from './security-api';
import ApiError from './api-error';

/**
 * Manages an access token refresh cycle
 */
class Token extends EventEmitter {

	/**
	 * Wraps an api call to ensure a valid token
	 * @param {Object} app - express app
	 * @param {Object} api - api module
	 * @param {string} apiCall - api method name
	 * @param {Object} apiCallOptions - options
	 * @param {function} callback - nodeback
	 */
	callApi(app, api, apiCall, apiCallOptions, callback) {
		this._fetch(app, (err, token) => {
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

	/**
	 * Try to fetch a valid access token
	 * @param {Object} app - express app
	 * @param {function} callback - nodeback
	 * @private
	 */
	_fetch(app, callback) {
		const accessToken = app.get('accessToken');

		if (accessToken) {
			securityApi.setToken(accessToken);
			securityApi.authorize({scopes: 'affiliate:service', strict: false})
				.then(() => {
					if (Token._willExpire()) {
						this.emit('debug', {message: 'service level api token will expire'});
						this._refreshToken(app, callback);
					} else {
						callback(null, accessToken);
					}
				})
				.fail(() => {
					this.emit('debug', {message: 'service level api token has expired'});
					this._refreshToken(app, callback);
				});

		} else {
			this.emit('debug', {message: 'service level api token not found'});
			this._refreshToken(app, callback);
		}
	}

	/**
	 * Try to refresh an access token
	 * @param {Object} app - express app
	 * @param {function} callback - nodeback
	 * @private
	 */
	_refreshToken(app, callback) {

		let appConfig = config.get('app');

		this.emit('debug', {message: 'refresh service level api token'});

		securityApi.apiToken({
				Authorization: 'Basic ' + new Buffer(appConfig.apiKey.id + ':' + appConfig.apiKey.secret).toString('base64'),
				grantType: 'client_credentials',
				scope: 'affiliate:service'
			})
			.then((result) => {
				app.set('accessToken', result.body.accessToken);
				//api is in seconds, subtract a 30 second buffer
				app.set('expiresIn', new Date(new Date().getTime() + ((result.body.expiresIn - 30) * 1000)));
				callback(null, result.body.accessToken);
			})
			.fail((err) => {
				this.emit('error', {message: 'failed to refresh service level api token', data: err});
				callback(err);
			});
	}

	/**
	 * Test to see if a token will expire in the next 30 seconds
	 * @param {Object} app - express app
	 * @returns {boolean}
	 * @private
	 */
	static _willExpire(app) {
		const expiresIn = app.get('expiresIn');
		if (!expiresIn) {
			return true;
		}
		return expiresIn <= new Date();
	}

}

export default new Token();