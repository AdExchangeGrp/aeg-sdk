'use strict';

import { SecurityService } from './securityService.js';
import config from 'config';

let securityService = null;

if (config.has('securityService')) {
	let securityServiceConfig = config.get('securityService');
	securityService = new SecurityService(securityServiceConfig.host + securityServiceConfig.baseUrl);
	console.log(securityService);
}

export default securityService;