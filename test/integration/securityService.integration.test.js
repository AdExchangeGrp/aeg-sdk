'use strict';

let TestApi = require('../../lib/securityService.js').TestApi;

describe('securityService', () => {

	describe('#test()', () => {

		it('should return without error', (done) => {
			var testApi = new TestApi('http://security-service.elasticbeanstalk.com', '/v1');
			testApi.test('Justin').asCallback((err, result) => {
				console.log(result);
				done(err);
			});
		});

	});

});