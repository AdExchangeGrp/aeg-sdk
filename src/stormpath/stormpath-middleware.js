'use strict';

import config from 'config';
import { logger } from '../logger-facade';

/**
 * Express middleware for integrating Stormpath
 * @param {Object} app
 * @param {Object} stormpath
 * @param {function} callback
 * @returns {Function}
 */
export default (app, stormpath, callback) => {

	logger.info('stormpathMiddleware: connecting...');

	const stormpathConfig = config.get('stormpath');

	app.set('stormpathConfig', stormpathConfig);

	const client = new stormpath.Client(stormpathConfig);

	app.set('stormpathClient', client);

	client.getApplication(stormpathConfig.application.href, (err, application) => {

		if (err) {
			logger.error('stormpathMiddleware: failed to connect');
			return callback(err);
		}

		app.set('stormpathApplication', application);

		logger.info('stormpathMiddleware: connected...');

		callback();
	});

	return (req, res, next) => {
		next();
	};
};
