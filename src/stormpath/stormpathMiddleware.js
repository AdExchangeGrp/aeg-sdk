'use strict';

import stormpath from 'stormpath';
import config from 'config';
import logger from '@adexchange/aeg-logger';

/**
 * Express middleware for integrating Stormpath
 * @param {Application} app
 * @param {function} callback
 * @returns {Function}
 */
export default (app, callback) => {

	const stormpathConfig = config.get('stormpath');

	app.set('stormpathConfig', stormpathConfig);

	const client = new stormpath.Client(stormpathConfig);

	app.set('stormpathClient', client);

	client.getApplication(stormpathConfig.application.href, (err, application) => {

		if (err) {
			return callback(err);
		}

		app.set('stormpathApplication', application);

		logger.info('stormpath ready...');

		callback();
	});

	return (req, res, next) => {
		next();
	};
};
