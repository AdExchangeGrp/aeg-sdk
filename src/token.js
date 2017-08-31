import { EventEmitter } from 'events';
import config from 'config';
import ApiError from './api-error';
import { SecurityService } from './security-service';

const conf = config.get('aeg-sdk');

/**
 * Manages an access token refresh cycle
 */
class Token extends EventEmitter {

	/**
	 * Wraps an api call to ensure a valid token
	 * @param {Object} app - express app
	 * @param {Object} api - api module
	 * @param {string} method - api method name
	 * @param {Object} params - params
	 * @param {Object} options
	 */
	async callApi (app, api, method, params, options = {}) {

		let token = null;
		const securityService = new SecurityService(options);

		try {

			token = await this._fetch(app, securityService);

		} catch (ex) {

			this.emit('error', {message: 'Could not get api token', err: ex});
			throw ex;

		}

		try {

			api.setToken(token);
			const result = await api[method](params);
			return result.body;

		} catch (ex) {

			throw new ApiError(ex);

		}

	}

	/**
	 * Try to fetch a valid access token
	 * @param {Object} app - express app
	 * @param {Object} securityService
	 * @private
	 */
	async _fetch (app, securityService) {

		const accessToken = app.get('accessToken');

		if (accessToken) {

			securityService.setToken(accessToken);

			try {

				await securityService.authorize({scopes: config.get('aeg-sdk').scope, strict: false});

				if (Token._willExpire(app)) {

					this.emit('debug', {message: 'service level api token will expire'});
					return await this._refreshToken(app, securityService);

				} else {

					return accessToken;

				}

			} catch (ex) {

				this.emit('debug', {message: 'service level api token has expired'});
				return this._refreshToken(app, securityService);

			}

		} else {

			this.emit('debug', {message: 'service level api token not found'});
			return this._refreshToken(app, securityService);

		}

	}

	/**
	 * Try to refresh an access token
	 * @param {Object} app - express app
	 * @param {Object} securityService
	 * @private
	 */
	async _refreshToken (app, securityService) {

		this.emit('debug', {message: 'refresh service level api token'});

		try {

			const result = await securityService.apiToken(
				{
					Authorization: 'Basic ' + Buffer.from(conf.apiKey.id + ':' + conf.apiKey.secret, 'utf8').toString('base64'),
					grantType: 'client_credentials',
					scope: conf.scope
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
