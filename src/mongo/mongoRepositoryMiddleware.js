'use strict';

import MongoRepository from './mongoRepository';
import logger from '@adexchange/aeg-logger';

/**
 * Express middleware for managing a Mongo repository
 * @param {Application} app
 * @param {function} callback
 * @returns {Function}
 */
export default (app, callback) => {

	let repository = new MongoRepository();

	logger.info('mongoRepositoryMiddleware: connecting...');

	repository.connect((err) => {

		if (err) {
			logger.error('mongoRepositoryMiddleware: failed to connect');
			return callback(err);
		}

		app.set('mongoRepository', repository);

		logger.info('mongoRepositoryMiddleware: connected...');

		callback();
	});

	return function (req, res, next) {
		next();
	};
};