'use strict';

import MongoRepository from './mongoRepository';

/**
 * Express middleware for managing a Mongo repository
 * @param {Application} app
 * @returns {Function}
 */
export default (app) => {

	let repository = new MongoRepository();

	repository.connect((err) => {
		if (err) {
			throw err;
		}

		app.set('mongoRepository', repository);
		app.emit('mongo.ready');
	});

	return function (req, res, next) {
		next();
	};
};