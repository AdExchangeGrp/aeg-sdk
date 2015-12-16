'use strict';

import OrganizationCustomData from './organizationCustomData';

class AffiliateCustomData extends OrganizationCustomData {

	constructor(customData) {
		super('affiliate', customData);
	}

}

export default AffiliateCustomData;