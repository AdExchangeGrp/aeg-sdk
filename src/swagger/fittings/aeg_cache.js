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

	const options = {
		host: appConfig.cache.host,
		port: appConfig.cache.port
	};

	if (cachePrefix) {
		options.prefix = cachePrefix;
	}

	const client = cache(options);

	return (context, callback) => {
		const operation = context.request.swagger.operation;
		if (operation['x-cache']) {
			logger.debug('aeg_cache: cache hit', {
				operation: operation.operationId,
				description: operation.description
			});

			const options = {
				expire: operation['x-cache']
			};

			client.route(options)(context.request, context.response, callback);
		} else {
			callback();
		}
	};
};
