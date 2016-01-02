'use strict';

import CustomData from './custom-data';

/**
 * Custom data schema for an account
 */
class AccountCustomData extends CustomData {

	constructor(customData) {
		super(customData);
	}

	getTitle() {
		return this._data.title;
	}

	getPhone() {
		return this._data.phone;
	}

	getImScreenName() {
		if (this._data.im) {
			return this._data.im.screenName;
		}
	}

	getImService() {
		if (this._data.im) {
			return this._data.im.service;
		}
	}

	getAddress() {
		if (this._data.address) {
			return this._data.address.address;
		}
	}

	getSuite() {
		if (this._data.address) {
			return this._data.address.suite;
		}
	}

	getCity() {
		if (this._data.address) {
			return this._data.address.city;
		}
	}

	getState() {
		if (this._data.address) {
			return this._data.address.state;
		}
	}

	getPostalCode() {
		if (this._data.address) {
			return this._data.address.postalCode;
		}
	}

	getCountry() {
		if (this._data.address) {
			return this._data.address.country;
		}
	}

	getTimezone() {
		return this._data.timezone;
	}

}

export default AccountCustomData;