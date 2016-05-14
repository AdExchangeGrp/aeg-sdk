'use strict';

/**
 * Configurable service proxy
 */

import { AffiliateService } from './affiliate-service.js';
import config from 'config';

let affiliateService = null;

//noinspection JSUnresolvedVariable
if (config.has('aeg-sdk') && config.get('aeg-sdk').affiliateService) {
	//noinspection JSUnresolvedVariable
	let affiliateServiceConfig = config.get('aeg-sdk').affiliateService;
	affiliateService = new AffiliateService(affiliateServiceConfig.host);
}

export default affiliateService;