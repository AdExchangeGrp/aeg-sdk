'use strict';

import logger from '@adexchange/aeg-logger';
import config from 'config';
import mongoose from 'mongoose';
import _ from 'lodash';

class MongoRepository {

	constructor() {
		this._mongoConfig = config.get('app').mongo;
		this._connected = false;
	}

	connect(callback) {

		let self = this;

		if (self._connected) {
			return callback();
		}

		let connectionString = `mongodb://${this._mongoConfig.user}:${this._mongoConfig.password}@`;

		_.each(this._mongoConfig.hosts, (host) => {
			connectionString += host + ',';
		});

		connectionString = connectionString.slice(0, -1);

		connectionString += `/${this._mongoConfig.database}?replicaSet=${this._mongoConfig.replicaSet}`;

		this._db = mongoose.connection;
		this._db.on('error', callback);
		this._db.once('open', () => {
			self._connected = true;

			logger.info(`Connected to mongodb`);

			callback();
		});

		logger.info(`Connecting to ${connectionString}`);

		mongoose.connect(connectionString);
	}

	dispose(callback) {

		let self = this;

		if (!self._connected) {
			return callback();
		}

		logger.info('Mongo disconnected ...');

		this._db.disconnect(callback);
	}

}

export default MongoRepository;

