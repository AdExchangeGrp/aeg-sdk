'use strict';

import OrganizationCustomData from './organizationCustomData';

class AffiliateCustomData extends OrganizationCustomData {

	constructor(customData) {
		super('affiliate', customData);
	}

	getId() {
		return this._data.id;
	}

	setId(id) {
		this._data.id = id;
	}
}

export default AffiliateCustomData;