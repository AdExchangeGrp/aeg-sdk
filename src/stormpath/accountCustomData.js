'use strict';

class AccountCustomData {

	constructor(options, customData) {

		this._data = customData;

		if (options && options.timezone) {
			this._data.timezone = options.timezone;
		}
	}

	getCustomData() {
		return this._data;
	}

	getTimezone() {
		return this._data.timezone;
	}

	save(callback) {
		this._data.save(callback);
	}
}

export default AccountCustomData;