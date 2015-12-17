'use strict';

import _ from 'lodash';
import m from 'merge';

/**
 * Custom data schema
 */
class CustomData {

	constructor(customData) {
		this._data = customData ? customData : {};
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

		m.recursive(this._data, mergeData);

		callback();
	}

	stringify() {
		return JSON.stringify(this._data);
	}

	save(callback) {
		this._data.save(callback);
	}
}

export default CustomData;