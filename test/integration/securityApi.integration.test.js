'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');

describe('securityApi', () => {

	let apiKeyNotScoped;
	let apiKeyScoped;
	let apiTokenAuthorizationNotScoped;
	let apiTokenAuthorizationScoped;
	let passwordAuthorizationNotScoped;
	let passwordAuthorizationScoped;
	let refreshPasswordAuthorizationScoped;
	let refreshToken;

	describe('#passwordToken()', () => {

		it('should return scoped password token without error', (done) => {
			securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd', scope: 'test'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					passwordAuthorizationScoped = 'Bearer ' + result.body.accessToken;
					refreshToken = result.body.refreshToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
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
					done(new ApiError(err));
				});
		});

	});

	describe('#createApiKey()', () => {

		it('should return api key without error', (done) => {
			securityApi.createApiKey({authorization: passwordAuthorizationNotScoped})
				.then((result) => {
					result.body.should.have.properties(['id', 'secret']);
					result.body.id.should.be.a.String;
					result.body.id.length.should.be.greaterThan(0);
					result.body.secret.should.be.a.String;
					result.body.secret.length.should.be.greaterThan(0);
					apiKeyScoped = 'Basic ' + new Buffer(result.body.id + ':' + result.body.secret).toString('base64');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should return api key without error', (done) => {
			securityApi.createApiKey({authorization: passwordAuthorizationNotScoped})
				.then((result) => {
					result.body.should.have.properties(['id', 'secret']);
					result.body.id.should.be.a.String;
					result.body.id.length.should.be.greaterThan(0);
					result.body.secret.should.be.a.String;
					result.body.secret.length.should.be.greaterThan(0);
					apiKeyNotScoped = 'Basic ' + new Buffer(result.body.id + ':' + result.body.secret).toString('base64');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});
	});

	describe('#apiToken()', () => {

		it('should return scoped api token without error', (done) => {
			securityApi.apiToken({authorization: apiKeyScoped, grantType: 'client_credentials', scope: 'test'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					apiTokenAuthorizationScoped = 'Bearer ' + result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should return api token without error', (done) => {
			securityApi.apiToken({authorization: apiKeyNotScoped, grantType: 'client_credentials'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					apiTokenAuthorizationNotScoped = 'Bearer ' + result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#test()', () => {

		it('should return without error', (done) => {
			securityApi.test({name: 'Justin'})
				.then((result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
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
					done(new ApiError(err));
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
					done(new ApiError(err));
				});
		});

	});

	describe('#refreshToken()', () => {

		it('should refresh a password token', (done) => {
			securityApi.refreshPasswordToken({
					refreshToken: refreshToken,
					priorAccessToken: passwordAuthorizationScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					refreshPasswordAuthorizationScoped = 'Bearer ' + result.body.accessToken;
					refreshToken = result.body.refreshToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#testScopeProtected()', () => {

		it('should execute with a password token', (done) => {
			securityApi.testScopeProtected({authorization: refreshPasswordAuthorizationScoped, name: 'Justin'})
				.then((result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#revokePasswordToken', () => {

		it('should revoke the password access token with scope', (done) => {
			securityApi.revokePasswordToken({
					authorization: passwordAuthorizationScoped,
					accessToken: passwordAuthorizationScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should revoke the password access token without scope', (done) => {
			securityApi.revokePasswordToken({
					authorization: passwordAuthorizationNotScoped,
					accessToken: passwordAuthorizationNotScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});

		});

		it('should revoke the password access via refresh token with scope', (done) => {
			securityApi.revokePasswordToken({
					authorization: refreshPasswordAuthorizationScoped,
					accessToken: refreshPasswordAuthorizationScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});

		});

	});

	describe('#revokeApiToken', () => {

		it('should revoke the access token that was scoped', (done) => {
			securityApi.revokeApiToken({
					authorization: apiTokenAuthorizationScoped,
					accessToken: apiTokenAuthorizationScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should revoke the access token that was not scoped', (done) => {
			securityApi.revokeApiToken({
					authorization: apiTokenAuthorizationNotScoped,
					accessToken: apiTokenAuthorizationNotScoped.split(' ')[1]
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

	});

	describe('#testScopeProtected()', () => {

		it('should return with 401 with a bad api token that was scoped', (done) => {
			securityApi.testScopeProtected({authorization: apiTokenAuthorizationScoped, name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should return with 401 with a bad api token that was not scoped', (done) => {
			securityApi.testScopeProtected({authorization: apiTokenAuthorizationNotScoped, name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should return with 401 with a bad password token that was scoped', (done) => {
			securityApi.testScopeProtected({authorization: passwordAuthorizationScoped, name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should return with 401 with a bad password token that was not scoped', (done) => {
			securityApi.testScopeProtected({authorization: passwordAuthorizationNotScoped, name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should return with 401 with a bad password token that was from a refresh and scoped', (done) => {
			securityApi.testScopeProtected({authorization: refreshPasswordAuthorizationScoped, name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

	});

});