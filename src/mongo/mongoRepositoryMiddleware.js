'use strict';

import MongoRepository from './mongoRepository';

/**
 * Express middleware to manage a Mongo repository
 */
class MongoRepositoryMiddleware {

	constructor() {
		this.repository = new MongoRepository();
	}

	/**
	 * Setup a Mongo repository and return a middleware
	 * @param {Object} app
	 * @param {Object} mongoose
	 * @param {function} callback
	 * @returns {Function}
	 */
	middleware(app, mongoose, callback) {

		this.repository.connect(mongoose, (err) => {

			if (err) {
				return callback(err);
			}

			app.set('mongoRepository', this.repository);

			callback();
		});

		return function (req, res, next) {
			next();
		};
	}
}

export default new MongoRepositoryMiddleware();