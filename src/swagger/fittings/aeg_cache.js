'use strict';

import config from 'config';
import logger from '@adexchange/aeg-logger';
import cache from 'express-redis-cache';

/**
 * Swagger bagpipes fitting to cache api method responses
 * @returns {Function}
 */
export default () => {

	const appConfig = config.get('app');

	const client = cache({
		host: appConfig.cache.host, port: appConfig.cache.port
	});

	return (context, callback) => {
		const operation = context.request.swagger.operation;
		if (operation['x-cache']) {
			logger.debug('cache hit', {operation: operation.operationId, description: operation.description});
			client.route({expire: operation['x-cache']})(context.request, context.response, callback);
		} else {
			callback();
		}
	};
};
