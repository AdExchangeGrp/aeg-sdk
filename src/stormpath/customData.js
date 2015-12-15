'use strict';

import _ from 'underscore';

class CustomData {

	constructor(customData) {
		this._data = customData;
	}

	getCustomData() {
		return this._data;
	}

	merge(json, callback) {

		let mergeData;

		if (_.isString(json)) {
			try {
				mergeData = JSON.parse(json);
			} catch (ex) {
				return callback(ex);
			}
		} else {
			mergeData = json;
		}

		_.extend(this._data, mergeData);

		callback();
	}

	save(callback) {
		this._data.save(callback);
	}
}

export default CustomData;