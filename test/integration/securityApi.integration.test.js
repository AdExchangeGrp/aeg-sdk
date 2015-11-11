'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');

describe('securityApi', () => {

	let apiKey = 'Basic ' + new Buffer('18IDK3HV0H460UB767DBUM3LF:aTM6JHBli5V87316fzlDEY5xsGMmVCQ8WsJ2YqdhsZ8').toString('base64');
	let apiTokenAuthorizationNotScoped;
	let apiTokenAuthorizationScoped;
	let passwordAuthorizationNotScoped;
	let passwordAuthorizationScoped;
	let refreshPasswordAuthorizationScoped;
	let refreshToken;

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
					done(new ApiError(err));
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
					done(new ApiError(err));
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
			//console.log(refreshToken);
			securityApi.refreshPasswordToken({refreshToken: refreshToken})
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
			console.log(refreshPasswordAuthorizationScoped);
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

	describe('#revokePasswordToken', () => {

		//it('should revoke the access token', (done) => {
		//	securityApi.revokeApiToken({
		//			authorization: apiTokenAuthorizationScoped,
		//			accessToken: apiTokenAuthorizationScoped.split(' ')[1]
		//		})
		//		.then((result) => {
		//			result.body.message.should.be.equal('success');
		//			done();
		//		})
		//		.fail((err) => {
		//			done(err);
		//		});
		//});

		//it('should revoke the access token', (done) => {
		//	securityApi.revokeApiToken({
		//			authorization: apiTokenAuthorizationNotScoped,
		//			accessToken: apiTokenAuthorizationNotScoped.split(' ')[1]
		//		})
		//		.then((result) => {
		//			result.body.message.should.be.equal('success');
		//			done();
		//		})
		//		.fail((err) => {
		//			done(err);
		//		});
		//});

	});

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