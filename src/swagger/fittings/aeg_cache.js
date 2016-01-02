'use strict';

import config from 'config';
import cache from 'express-redis-cache';
import { EventEmitter } from 'events';

/**
 * Swagger bagpipes fitting to cache api method responses
 */
class Cache extends EventEmitter {

	constructor(cachePrefix) {
		super();
		this._cachePrefix = cachePrefix;
	}

	fitting() {

		let self = this;

		const appConfig = config.get('app');

		const options = {
			host: appConfig.cache.host,
			port: appConfig.cache.port
		};

		if (this._cachePrefix) {
			options.prefix = this._cachePrefix;
		}

		const client = cache(options);

		return (context, callback) => {
			const operation = context.request.swagger.operation;
			if (operation['x-cache']) {

				self.emit('debug', {
					message: 'cache hit',
					data: {
						operation: operation.operationId,
						description: operation.description
					}
				});

				const options = {
					expire: operation['x-cache']
				};

				client.route(options)(context.request, context.response, callback);
			} else {
				callback();
			}
		};
	}
}

export default Cache;
