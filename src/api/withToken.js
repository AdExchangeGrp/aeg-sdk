'use strict';

import logger from '@adexchange/aeg-logger';
import getToken from './getToken';
import ApiError from './apiError';

export default (app, api, apiCall, options, callback) => {
	getToken(app, (err, token) => {
		if (err) {
			logger.errorWithMessage('withToken: Could not get token', err);
			callback(err);
		} else {
			api.setToken(token);
			apiCall(options)
				.then((result) => {
					callback(null, result.body);
				})
				.fail((err) => {
					callback(new ApiError(err));
				});
		}
	});
};