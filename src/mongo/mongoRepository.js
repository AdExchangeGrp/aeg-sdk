'use strict';

import { logger } from '../logger-facade';
import config from 'config';
import _ from 'lodash';

/**
 * Mongoose Mongo repository
 */
class MongoRepository {

	constructor() {
		this._mongoConfig = config.get('app').mongo;
		this._connected = false;
	}

	/**
	 * Connect to Mongo
	 * @param {Object} mongoose
	 * @param {function} callback
	 * @returns {*}
	 */
	connect(mongoose, callback) {

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

			logger.debug(`mongoRepository#connect: connected`);

			callback();
		});

		logger.debug(`mongoRepository#connect: connecting to ${connectionString}`);

		mongoose.connect(connectionString);
	}

	/**
	 * Disconnect from Mongo
	 * @param {function} callback
	 * @returns {*}
	 */
	dispose(callback) {

		let self = this;

		if (!self._connected) {
			return callback();
		}

		logger.info('mongoRepository#dispose: disconnected');

		this._db.disconnect(callback);
	}

}

export default MongoRepository;

