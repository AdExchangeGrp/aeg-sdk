'use strict';

let config = require('config');
let TestApi = require('../../lib/securityService.js').TestApi;

let securityServiceConfig = config.get('securityService');

describe('securityService', () => {

	describe('testApi', () => {

		describe('#test()', () => {

			it('should return without error', (done) => {
				var testApi = new TestApi(securityServiceConfig.host, securityServiceConfig.baseUrl);
				testApi.test('Justin').asCallback((err, result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done(err);
				});
			});

		});

	});

});