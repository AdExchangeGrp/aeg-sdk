'use strict';

import logger from '@adexchange/aeg-logger';
import getToken from './getToken';
import ApiError from './apiError';

/**
 * Executes an api call with a token
 * @param {Object} app - express app
 * @param {Object} api - sdk api object
 * @param {string} apiCall - api method
 * @param {Object} apiCallOptions - api method params
 * @param {function} callback
 */
export default (app, api, apiCall, apiCallOptions, callback) => {
	getToken(app, (err, token) => {
		if (err) {
			logger.errorWithMessage('withToken: Could not get token', err);
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
};