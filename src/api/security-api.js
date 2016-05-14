'use strict';

/**
 * Configurable service proxy
 */

import {SecurityService} from './security-service.js';
import config from 'config';

let securityService = null;

//noinspection JSUnresolvedVariable
if (config.has('aeg-sdk') && config.get('aeg-sdk').securityService) {
	//noinspection JSUnresolvedVariable
	let securityServiceConfig = config.get('aeg-sdk').securityService;
	securityService = new SecurityService(securityServiceConfig.host);
}

export default securityService;