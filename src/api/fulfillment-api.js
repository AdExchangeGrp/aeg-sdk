/**
 * Configurable service proxy
 */

import { FulfillmentService } from './fulfillment-service.js';
import config from 'config';

let fulfillmentService = null;

if (config.has('aeg-sdk') && config.get('aeg-sdk').fulfillmentService) {

	const fulfillmentServiceConfig = config.get('aeg-sdk').fulfillmentService;
	fulfillmentService = new FulfillmentService(fulfillmentServiceConfig.host);

}

export default fulfillmentService;
