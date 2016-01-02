'use strict';

/**
 * Configurable service proxy
 */

import { SecurityService } from './security-service.js';
import config from 'config';

let securityService = null;

if (config.has('securityService')) {
	let securityServiceConfig = config.get('securityService');
	securityService = new SecurityService(securityServiceConfig.host);
}

export default securityService;