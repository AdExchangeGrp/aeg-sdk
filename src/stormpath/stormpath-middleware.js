'use strict';

import config from 'config';
import { EventEmitter } from 'events';

/**
 * Express middleware for integrating Stormpath
 */
class StormpathMiddleware extends EventEmitter {

	middleware() {

		var self = this;

		return (app, stormpath, callback) => {

			self.emit('connecting');

			const stormpathConfig = config.get('stormpath');

			app.set('stormpathConfig', stormpathConfig);

			const client = new stormpath.Client(stormpathConfig);

			app.set('stormpathClient', client);

			client.getApplication(stormpathConfig.application.href, (err, application) => {

				if (err) {
					return callback(err);
				}

				app.set('stormpathApplication', application);

				self.emit('connected');

				callback();
			});

			return (req, res, next) => {
				next();
			};
		};
	}
}

export default StormpathMiddleware;
