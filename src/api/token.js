import { EventEmitter } from 'events';
import config from 'config';
import securityApi from './security-api';
import ApiError from './api-error';

/**
 * Manages an access token refresh cycle
 */
class Token extends EventEmitter {

	/**
	 * Constructor
	 */
	constructor () {

		super();
		this._config = config.get('aeg-sdk');

	}

	/**
	 * Wraps an api call to ensure a valid token
	 * @param {Object} app - express app
	 * @param {Object} api - api module
	 * @param {string} apiCall - api method name
	 * @param {Object} apiCallOptions - options
	 */
	async callApi (app, api, apiCall, apiCallOptions) {

		let token = null;

		try {

			token = await this._fetch(app);

		} catch (ex) {

			this.emit('error', {message: 'Could not get api token', err: ex});
			throw ex;

		}

		try {

			api.setToken(token);
			const result = await api[apiCall](apiCallOptions);
			return result.body;

		} catch (ex) {

			throw new ApiError(ex);

		}

	}

	/**
	 * Try to fetch a valid access token
	 * @param {Object} app - express app
	 * @private
	 */
	async _fetch (app) {

		const accessToken = app.get('accessToken');

		if (accessToken) {

			securityApi.setToken(accessToken);

			try {

				await securityApi.authorize({scopes: this._config.scope, strict: false});

				if (Token._willExpire(app)) {

					this.emit('debug', {message: 'service level api token will expire'});
					return await this._refreshToken(app);

				} else {

					return accessToken;

				}

			} catch (ex) {

				this.emit('debug', {message: 'service level api token has expired'});
				return await this._refreshToken(app);

			}

		} else {

			this.emit('debug', {message: 'service level api token not found'});
			return await this._refreshToken(app);

		}

	}

	/**
	 * Try to refresh an access token
	 * @param {Object} app - express app
	 * @private
	 */
	async _refreshToken (app) {

		this.emit('debug', {message: 'refresh service level api token'});

		try {

			const result = await securityApi.apiToken(
				{
					Authorization: 'Basic ' + new Buffer(this._config.apiKey.id + ':' + this._config.apiKey.secret).toString('base64'),
					grantType: 'client_credentials',
					scope: this._config.scope
				});

			app.set('accessToken', result.body.accessToken);
			// api is in seconds, subtract a 30 second buffer
			app.set('expiresIn', new Date(new Date().getTime() + ((result.body.expiresIn - 30) * 1000)));

			return result.body.accessToken;

		} catch (ex) {

			this.emit('error', {message: 'failed to refresh service level api token', err: ex});
			throw ex;

		}

	}

	/**
	 * Test to see if a token will expire in the next 30 seconds
	 * @param {Object} app - express app
	 * @returns {boolean}
	 * @private
	 */
	static _willExpire (app) {

		const expiresIn = app.get('expiresIn');

		if (!expiresIn) {

			return true;

		}

		return expiresIn <= new Date();

	}

}

export default new Token();
