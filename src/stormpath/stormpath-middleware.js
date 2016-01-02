'use strict';

import config from 'config';
import { EventEmitter } from 'events';

/**
 * Express middleware for integrating Stormpath
 */
class StormpathMiddleware extends EventEmitter {

	constructor(app, stormpath) {
		super();
		this._app = app;
		this._stormpath = stormpath;
	}

	middleware(callback) {

		var self = this;

		self.emit('connecting');

		const stormpathConfig = config.get('stormpath');

		self._app.set('stormpathConfig', stormpathConfig);

		const client = new self._stormpath.Client(stormpathConfig);

		self._app.set('stormpathClient', client);

		client.getApplication(stormpathConfig.application.href, (err, application) => {

			if (err) {
				return callback(err);
			}

			self._app.set('stormpathApplication', application);

			self.emit('connected');

			callback();
		});

		return (req, res, next) => {
			next();
		};
	}
}

export default StormpathMiddleware;
