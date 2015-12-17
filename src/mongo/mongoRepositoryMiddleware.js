'use strict';

import MongoRepository from './mongoRepository';

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