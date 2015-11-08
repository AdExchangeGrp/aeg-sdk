'use strict';

let SecurityApi = require('../../lib/api/securityApi.js');

describe('securityApi', () => {

	let apiTokenAuthorizationNotScoped;
	let apiTokenAuthorizationScoped;
	let passwordAuthorizationNotScoped;
	let passwordAuthorizationScoped;

	describe('tokenApi', () => {

		describe('#apiToken()', () => {

			it('should return scoped api token without error', (done) => {
				var authorization = 'Basic ' + new Buffer('7JRFTHYO5DNISRJ5JZKUPP5KN:WssetPhb60PeMqbVv+IkpL2L7wI5BBUiXcA22RTwPL8').toString('base64');
				SecurityApi.tokenApi.apiToken(authorization, 'client_credentials', 'test').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.have.properties(['access_token']);
					result.body.access_token.should.be.a.String;
					result.body.access_token.length.should.be.greaterThan(0);
					apiTokenAuthorizationScoped = 'Bearer ' + result.body.access_token;
					done();
				});
			});

			it('should return api token without error', (done) => {
				var authorization = 'Basic ' + new Buffer('7JRFTHYO5DNISRJ5JZKUPP5KN:WssetPhb60PeMqbVv+IkpL2L7wI5BBUiXcA22RTwPL8').toString('base64');
				SecurityApi.tokenApi.apiToken(authorization, 'client_credentials').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.have.properties(['access_token']);
					result.body.access_token.should.be.a.String;
					result.body.access_token.length.should.be.greaterThan(0);
					apiTokenAuthorizationNotScoped = 'Bearer ' + result.body.access_token;
					done();
				});
			});

		});

		describe('#passwordToken()', () => {

			it('should return scoped password token without error', (done) => {
				SecurityApi.tokenApi.passwordToken('test@test.com', 'Pa$$w0rd', 'test').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.have.properties(['access_token']);
					result.body.access_token.should.be.a.String;
					result.body.access_token.length.should.be.greaterThan(0);
					passwordAuthorizationScoped = 'Bearer ' + result.body.access_token;
					done();
				});
			});

			it('should return password token without error', (done) => {
				SecurityApi.tokenApi.passwordToken('test@test.com', 'Pa$$w0rd').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.have.properties(['access_token']);
					result.body.access_token.should.be.a.String;
					result.body.access_token.length.should.be.greaterThan(0);
					passwordAuthorizationNotScoped = 'Bearer ' + result.body.access_token;
					done();
				});
			});

		});

	});

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

			it('should return with 401 with a bad api token', (done) => {
				SecurityApi.testApi.testScopeProtected('notoken', 'Justin').asCallback((err) => {
					if (err) {
						err.response.statusCode.should.be.equal(403);
						return done();
					} else {
						done(new Error('Call should have failed unauthorized'));
					}
				});
			});

			it('should return with 401 with an api token not scoped', (done) => {
				SecurityApi.testApi.testScopeProtected(apiTokenAuthorizationNotScoped, 'Justin').asCallback((err) => {
					if (err) {
						err.response.statusCode.should.be.equal(403);
						return done();
					} else {
						done(new Error('Call should have failed unauthorized'));
					}
				});
			});

			it('should execute with an api token', (done) => {
				SecurityApi.testApi.testScopeProtected(apiTokenAuthorizationScoped, 'Justin').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done(err);
				});
			});

			it('should return with 401 with an password token not scoped', (done) => {
				SecurityApi.testApi.testScopeProtected(passwordAuthorizationNotScoped, 'Justin').asCallback((err) => {
					if (err) {
						err.response.statusCode.should.be.equal(403);
						return done();
					} else {
						done(new Error('Call should have failed unauthorized'));
					}
				});
			});

			it('should execute with a password token', (done) => {
				SecurityApi.testApi.testScopeProtected(passwordAuthorizationScoped, 'Justin').asCallback((err, result) => {
					if (err) {
						return done(err);
					}
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done(err);
				});
			});

		});

	});

});