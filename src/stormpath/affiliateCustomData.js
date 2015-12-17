'use strict';

import OrganizationCustomData from './organizationCustomData';

/**
 * Custom data schema for an affiliate
 */
class AffiliateCustomData extends OrganizationCustomData {

	constructor(customData) {
		super('affiliate', customData);
	}

}

export default AffiliateCustomData;