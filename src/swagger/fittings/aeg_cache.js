'use strict';

import config from 'config';
import logger from '@adexchange/aeg-logger';
import cache from 'express-redis-cache';

/**
 * Swagger bagpipes fitting to cache api method responses
 * @param {string} cachePrefix
 * @returns {Function}
 */
export default (cachePrefix) => {

	const appConfig = config.get('app');

	const client = cache({
		host: appConfig.cache.host, port: appConfig.cache.port
	});

	return (context, callback) => {
		const operation = context.request.swagger.operation;
		if (operation['x-cache']) {
			logger.debug('aeg_cache: cache hit', {
				operation: operation.operationId,
				description: operation.description
			});

			let options = {
				expire: operation['x-cache']
			};

			if (cachePrefix) {
				options.prefix = cachePrefix;
			}

			client.route(options)(context.request, context.response, callback);
		} else {
			callback();
		}
	};
};
