'use strict';

import stormpath from 'stormpath';
import config from 'config';

/**
 * Express middleware for integrating Stormpath
 * @param {Application} app
 * @returns {Function}
 */
export default (app) => {

	const stormpathConfig = config.get('stormpath');

	app.set('stormpathConfig', stormpathConfig);

	const client = new stormpath.Client(stormpathConfig);

	app.set('stormpathClient', client);

	client.getApplication(stormpathConfig.application.href, (err, application) => {
		if (err) {
			throw err;
		}

		app.set('stormpathApplication', application);
		app.emit('stormpath.ready');
	});

	return (req, res, next) => {
		next();
	};
};
