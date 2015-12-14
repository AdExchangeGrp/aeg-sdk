'use strict';

import OrganizationCustomData from './organizationCustomData';

class AffiliateCustomData extends OrganizationCustomData {

	constructor(options, customData) {

		super('affiliate', options, customData);

	}

}

export default AffiliateCustomData;