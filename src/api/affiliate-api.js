'use strict';

/**
 * Configurable service proxy
 */

import { AffiliateService } from './affiliate-service.js';
import config from 'config';

let affiliateService = null;

if (config.has('affiliateService')) {
	let affiliateServiceConfig = config.get('affiliateService');
	affiliateService = new AffiliateService(affiliateServiceConfig.host);
}

export default affiliateService;