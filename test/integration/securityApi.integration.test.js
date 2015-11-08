'use strict';

let SecurityApi = require('../../lib/securityApi.js');

describe('securityApi', () => {

	describe('testApi', () => {

		describe('#test()', () => {

			it('should return without error', (done) => {
				SecurityApi.testApi.test('Justin').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done(err);
				});
			});

		});

		describe('#testScopeProtected()', () => {

			it('should return with 401', (done) => {
				SecurityApi.testApi.testScopeProtected('Justin').asCallback((err) => {
					if (err) {
						err.response.statusCode.should.be.equal(403);
						return done();
					} else {
						done(new Error('Call should have failed unauthorized'));
					}
				});
			});

		});

	});

});