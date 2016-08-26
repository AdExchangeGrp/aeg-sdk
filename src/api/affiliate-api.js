'use strict';

/**
 * Configurable service proxy
 */

import { AffiliateService } from './affiliate-service.js';
import config from 'config';

let affiliateService = null;

if (config.has('aeg-sdk') && config.get('aeg-sdk').affiliateService) {
	const affiliateServiceConfig = config.get('aeg-sdk').affiliateService;
	affiliateService = new AffiliateService(affiliateServiceConfig.host);
}

export default affiliateService;