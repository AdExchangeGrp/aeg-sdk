'use strict';

import MongoRepository from './mongoRepository';
import logger from '@adexchange/aeg-logger';

/**
 * Express middleware for managing a Mongo repository
 * @param {Application} app
 * @param {Object} mongoose
 * @param {function} callback
 * @returns {Function}
 */
export default (app, mongoose, callback) => {

	let repository = new MongoRepository();

	logger.info('mongoRepositoryMiddleware: connecting...');

	repository.connect(mongoose, (err) => {

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