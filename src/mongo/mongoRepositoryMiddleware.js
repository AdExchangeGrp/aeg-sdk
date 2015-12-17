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

	repository.connect((err) => {

		if (err) {
			return callback(err);
		}

		app.set('mongoRepository', repository);

		logger.info('mongodb ready...');

		callback();
	});

	return function (req, res, next) {
		next();
	};
};