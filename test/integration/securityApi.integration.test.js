'use strict';

let securityApi = require('../../lib/api/securityApi.js');

describe('securityApi', () => {

	let apiKey = 'Basic ' + new Buffer('H7D88LNKLC8XT8P7PE9WRICAX:A7kZnx/CHZ5BhBK/yrUG2nJ2pphM5DBKHxUB0swSCgs').toString('base64');
	let apiTokenAuthorizationNotScoped;
	let apiTokenAuthorizationScoped;
	let passwordAuthorizationNotScoped;
	let passwordAuthorizationScoped;

	describe('tokenApi', () => {

		describe('#apiToken()', () => {

			it('should return scoped api token without error', (done) => {
				securityApi.apiToken({authorization: apiKey, grantType: 'client_credentials', scope: 'test'})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
						result.body.accessToken.should.be.a.String;
						result.body.accessToken.length.should.be.greaterThan(0);
						apiTokenAuthorizationScoped = 'Bearer ' + result.body.accessToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return api token without error', (done) => {
				securityApi.apiToken({authorization: apiKey, grantType: 'client_credentials'})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
						result.body.accessToken.should.be.a.String;
						result.body.accessToken.length.should.be.greaterThan(0);
						apiTokenAuthorizationNotScoped = 'Bearer ' + result.body.accessToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});
		});

		describe('#passwordToken()', () => {

			it('should return scoped password token without error', (done) => {
				securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd', scope: 'test'})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
						result.body.accessToken.should.be.a.String;
						result.body.accessToken.length.should.be.greaterThan(0);
						passwordAuthorizationScoped = 'Bearer ' + result.body.accessToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return password token without error', (done) => {
				securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd'})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
						result.body.accessToken.should.be.a.String;
						result.body.accessToken.length.should.be.greaterThan(0);
						passwordAuthorizationNotScoped = 'Bearer ' + result.body.accessToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('testApi', () => {

		describe('#test()', () => {

			it('should return without error', (done) => {
				securityApi.test({name: 'Justin'})
					.then((result) => {
						result.body.should.be.eql({message: 'Hello, Justin!'});
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#testScopeProtected()', () => {

			it('should return with 401 with a bad api token', (done) => {
				securityApi.testScopeProtected({authorization: 'notoken', name: 'Justin'})
					.then(() => {
						done(new Error('Call should have failed unauthorized'));
					})
					.fail((err) => {
						err.response.statusCode.should.be.equal(401);
						return done();
					});
			});

			it('should return with 401 with an api token not scoped', (done) => {
				securityApi.testScopeProtected({authorization: apiTokenAuthorizationNotScoped, name: 'Justin'})
					.then(() => {
						done(new Error('Call should have failed unauthorized'));
					})
					.fail((err) => {
						err.response.statusCode.should.be.equal(401);
						return done();
					});
			});

			it('should execute with an api token', (done) => {
				securityApi.testScopeProtected({authorization: apiTokenAuthorizationScoped, name: 'Justin'})
					.then((result) => {
						result.body.should.be.eql({message: 'Hello, Justin!'});
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return with 401 with an password token not scoped', (done) => {
				securityApi.testScopeProtected({authorization: passwordAuthorizationNotScoped, name: 'Justin'})
					.then(() => {
						done(new Error('Call should have failed unauthorized'));
					})
					.fail((err) => {
						err.response.statusCode.should.be.equal(401);
						return done();
					});
			});

			it('should execute with a password token', (done) => {
				securityApi.testScopeProtected({authorization: passwordAuthorizationScoped, name: 'Justin'})
					.then((result) => {
						result.body.should.be.eql({message: 'Hello, Justin!'});
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('tokenApi', () => {

		describe('#revokeAccessToken', () => {

			it('should revoke the access token', (done) => {
				securityApi.revokePasswordToken({
						authorization: passwordAuthorizationScoped,
						accessToken: passwordAuthorizationScoped
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the access token', (done) => {
				securityApi.revokePasswordToken({
						authorization: passwordAuthorizationNotScoped,
						accessToken: passwordAuthorizationNotScoped
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});

			});

			//			securityApi.revokeApiToken({
			//					authorization: apiTokenAuthorizationScoped,
			//					accessToken: apiTokenAuthorizationScoped
			//				})
			//				.then((result) => {
			//					result.message.should.be.equal('success');
			//					done();
			//				})
			//				.fail((err) => {
			//					done(err);
			//				});
			//
			//			securityApi.revokeApiToken({
			//					authorization: apiTokenAuthorizationNotScoped,
			//					accessToken: apiTokenAuthorizationNotScoped
			//				})
			//				.then((result) => {
			//					result.message.should.be.equal('success');
			//					done();
			//				})
			//				.fail((err) => {
			//					done(err);
			//				});

		});

	});

	describe('testApi', () => {

		describe('#testScopeProtected()', () => {

			//it('should return with 401 with a bad api token', (done) => {
			//	SecurityApi.testApi.testScopeProtected(apiTokenAuthorizationScoped, 'Justin').asCallback((err) => {
			//		if (err) {
			//			err.response.statusCode.should.be.equal(401);
			//			return done();
			//		} else {
			//			done(new Error('Call should have failed unauthorized'));
			//		}
			//	});
			//});
			//
			//it('should return with 401 with a bad api token', (done) => {
			//	SecurityApi.testApi.testScopeProtected(apiTokenAuthorizationNotScoped, 'Justin').asCallback((err) => {
			//		if (err) {
			//			err.response.statusCode.should.be.equal(401);
			//			return done();
			//		} else {
			//			done(new Error('Call should have failed unauthorized'));
			//		}
			//	});
			//});

			//it('should return with 401 with a bas password token', (done) => {
			//	SecurityApi.testApi.testScopeProtected(passwordAuthorizationScoped, 'Justin').asCallback((err) => {
			//		if (err) {
			//			err.response.statusCode.should.be.equal(401);
			//			return done();
			//		} else {
			//			done(new Error('Call should have failed unauthorized'));
			//		}
			//	});
			//});
			//
			//it('should return with 401 with a bas password token', (done) => {
			//	SecurityApi.testApi.testScopeProtected(passwordAuthorizationNotScoped, 'Justin').asCallback((err) => {
			//		if (err) {
			//			err.response.statusCode.should.be.equal(401);
			//			return done();
			//		} else {
			//			done(new Error('Call should have failed unauthorized'));
			//		}
			//	});
			//});

		});

	});

});