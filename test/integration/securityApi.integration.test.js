'use strict';

let SecurityApi = require('../../lib/securityApi.js');

describe('securityApi', () => {

	describe('testApi', () => {

		describe('#test()', () => {

			it('should return without error', (done) => {
				SecurityApi.testApi.test('Justin').asCallback((err, result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done(err);
				});
			});

		});

	});

});