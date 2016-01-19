'use strict';

import SES from '../../src/aws/ses';
import config from 'config';

const awsConfig = config.get('aws');

describe('ses', () => {

	const client = new SES(awsConfig.public, awsConfig.private, awsConfig.ses.zone, {from: awsConfig.ses.from});

	it.skip('should generate an email using the default address', (done) => {
		client.send('justin@adexchangegrp.com', 'Test Email', 'This is a test', done);
	});

	it.skip('should generate an email', (done) => {
		client.send('justin@adexchangegrp.com', 'Test Email', 'This is a test', {from: 'test@aegaffiliate.com'}, done);
	});

});