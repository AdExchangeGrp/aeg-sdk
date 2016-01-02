'use strict';

import OrganizationCustomData from './organization-custom-data';

/**
 * Custom data schema for an affiliate
 */
class AffiliateCustomData extends OrganizationCustomData {

	constructor(customData) {
		super('affiliate', customData);
	}

}

export default AffiliateCustomData;