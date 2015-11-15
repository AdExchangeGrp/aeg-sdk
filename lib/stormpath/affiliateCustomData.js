'use strict';

let OrganizationCustomData = require('./organizationCustomData');

class AffiliateCustomData extends OrganizationCustomData {

	constructor(customData) {

		super('affiliate', customData);

		if (!this._data.approved) {
			this._data.approved = false;
		}
	}

	setApproved(approved) {
		this._data.approved = approved;
	}

	getApproved() {
		return this._data.approved;
	}

}

module.exports = AffiliateCustomData;