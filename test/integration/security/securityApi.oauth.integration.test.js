'use strict';

import securityApi from '../../../src/api/securityApi';
import _ from 'lodash';
import jwt from 'njwt';
import config from 'config';
import should from 'should';

/** @namespace result.body.should.have */
describe('securityApi - OAuth', () => {

	let apiKeyNotScoped;
	let apiKeyScoped;
	let apiTokenAuthorizationNotScoped;
	let apiTokenAuthorizationScoped;
	let passwordAuthorization;
	let refreshPasswordAuthorization;
	let refreshToken;

	describe('#passwordToken()', () => {

		let tempPasswordAccessToken;
		let tempPasswordRefreshToken;

		describe('org href search', () => {

			it('should return password token with org href and not return the account object', (done) => {
				securityApi.passwordToken({
						username: 'test@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: false,
						searchTerm: 'href',
						searchValue: 'https://api.stormpath.com/v1/organizations/5ejJyvdIsJNZ2j5clY0o1l'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						result.body.should.not.have.properties(['account']);
						tempPasswordAccessToken = result.body.accessToken;
						tempPasswordRefreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(tempPasswordAccessToken);
				securityApi.revokePasswordToken({refreshToken: tempPasswordRefreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not return password token with the org href', (done) => {
				securityApi.passwordToken({
						username: 'test-affiliate-170001@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'href',
						searchValue: 'https://api.stormpath.com/v1/organizations/FY4fz7C6gywxukmYolq3c'
					})
					.then(() => {
						done(new Error('Should have failed'));
					})
					.fail(() => {
						done();
					});
			});

		});

		describe('org name search', () => {

			it('should return password token with the org name', (done) => {
				securityApi.passwordToken({
						username: 'test@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'name',
						searchValue: 'Ad Exchange Group'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken', 'scope', 'expiresIn', 'tokenType', 'account']);
						tempPasswordAccessToken = result.body.accessToken;
						tempPasswordRefreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(tempPasswordAccessToken);
				securityApi.revokePasswordToken({refreshToken: tempPasswordRefreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not return password token with the org name', (done) => {
				securityApi.passwordToken({
						username: 'test-affiliate-170001@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'name',
						searchValue: 'Test Affiliate'
					})
					.then(() => {
						done(new Error('Should have failed'));
					})
					.fail(() => {
						done();
					});
			});

		});

		describe('org nameKey search', () => {

			it('should return password token with the org nameKey', (done) => {
				securityApi.passwordToken({
						username: 'test@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'nameKey',
						searchValue: 'adexchange'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						tempPasswordAccessToken = result.body.accessToken;
						tempPasswordRefreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(tempPasswordAccessToken);
				securityApi.revokePasswordToken({refreshToken: tempPasswordRefreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not return password token with the org nameKey', (done) => {
				securityApi.passwordToken({
						username: 'test-affiliate-170001@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'nameKey',
						searchValue: 'adexchange'
					})
					.then(() => {
						done(new Error('Should have failed'));
					})
					.fail(() => {
						done();
					});
			});

			it('should return password token with an org nameKey that exists but the account does not belong to', (done) => {
				securityApi.passwordToken({
						username: 'test@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'nameKey',
						searchValue: 'test-affiliate'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						tempPasswordAccessToken = result.body.accessToken;
						tempPasswordRefreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(tempPasswordAccessToken);
				securityApi.revokePasswordToken({refreshToken: tempPasswordRefreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return password token with the wrong nameKey since its an AEG directory user', (done) => {
				securityApi.passwordToken({
						username: 'test@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: true,
						searchTerm: 'nameKey',
						searchValue: '123456'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						tempPasswordAccessToken = result.body.accessToken;
						tempPasswordRefreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(tempPasswordAccessToken);
				securityApi.revokePasswordToken({refreshToken: tempPasswordRefreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('no search', () => {

			it('should return password token', (done) => {
				securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd', fetchAccount: true})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope', 'account']);
						(_.isObject(result.body.account)).should.be.ok;
						result.body.account.should.have.properties(['href', 'status', 'email', 'givenName', 'surname', 'scopes', 'customData']);
						result.body.account.href.should.be.a.String;
						result.body.account.href.length.should.be.greaterThan(0);
						_.isArray(result.body.account.scopes).should.be.ok;
						result.body.account.scopes.length.should.be.greaterThan(0);
						result.body.accessToken.should.be.a.String;
						result.body.accessToken.length.should.be.greaterThan(0);
						passwordAuthorization = result.body.accessToken;
						refreshToken = result.body.refreshToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not return password token', (done) => {
				securityApi.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd2', fetchAccount: true})
					.then(() => {
						done(new Error('Should have failed'));
					})
					.fail(() => {
						done();
					});
			});

		});

		describe('#passwordToken() againist an organization', () => {

			let accessToken, refreshToken;

			const stormpathConfig = config.get('stormpath');

			it('should get a password token for an organization account', (done) => {
				securityApi.passwordToken({
						username: 'test-affiliate-170001@test.com',
						password: 'Pa$$w0rd',
						fetchAccount: false,
						searchTerm: 'href',
						searchValue: 'https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						result.body.should.not.have.properties(['account']);

						accessToken = result.body.accessToken;
						refreshToken = result.body.refreshToken;

						jwt.verify(accessToken, stormpathConfig.apiKey.secret, (err, expanded) => {
							if (err) {
								return done(err);
							} else {
								should.exist(expanded.body.organization);
								expanded.body.organization.should.have.properties(['href', 'nameKey']);
								expanded.body.organization.href.should.be.equal('https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE');
								expanded.body.organization.nameKey.should.be.equal('170001');
								done();
							}
						});

					})
					.fail((err) => {
						done(err);
					});
			});

			it('should refresh a token for an organization account', (done) => {
				securityApi.refreshPasswordToken({
						refreshToken: refreshToken,
						searchTerm: 'href',
						searchValue: 'https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE'
					})
					.then((result) => {
						result.body.should.have.properties(['accessToken', 'refreshToken']);
						result.body.should.not.have.properties(['account']);

						accessToken = result.body.accessToken;
						refreshToken = result.body.refreshToken;

						jwt.verify(accessToken, stormpathConfig.apiKey.secret, (err, expanded) => {
							if (err) {
								return done(err);
							} else {
								should.exist(expanded.body.organization);
								expanded.body.organization.should.have.properties(['href', 'nameKey']);
								expanded.body.organization.href.should.be.equal('https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE');
								expanded.body.organization.nameKey.should.be.equal('170001');
								done();
							}
						});

					})
					.fail((err) => {
						done(err);
					});
			});

			it('should revoke the password access token and refresh token', (done) => {
				securityApi.setToken(accessToken);
				securityApi.revokePasswordToken({refreshToken: refreshToken})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('#createApiKey()', () => {

		it('should return scoped api key', (done) => {
			securityApi.setToken(passwordAuthorization);
			securityApi.createApiKey()
				.then((result) => {
					result.body.should.have.properties(['id', 'secret']);
					result.body.id.should.be.a.String;
					result.body.id.length.should.be.greaterThan(0);
					result.body.secret.should.be.a.String;
					result.body.secret.length.should.be.greaterThan(0);
					apiKeyScoped = new Buffer(result.body.id + ':' + result.body.secret).toString('base64');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return non-scoped api key', (done) => {
			securityApi.createApiKey()
				.then((result) => {
					result.body.should.have.properties(['id', 'secret']);
					result.body.id.should.be.a.String;
					result.body.id.length.should.be.greaterThan(0);
					result.body.secret.should.be.a.String;
					result.body.secret.length.should.be.greaterThan(0);
					apiKeyNotScoped = new Buffer(result.body.id + ':' + result.body.secret).toString('base64');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});
	});

	describe('#apiToken()', () => {

		it('should return scoped api token for api key', (done) => {
			securityApi.apiToken({
					Authorization: 'Basic ' + apiKeyScoped,
					grantType: 'client_credentials',
					scope: 'test'
				})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					apiTokenAuthorizationScoped = result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return non-scoped api token for api key', (done) => {
			securityApi.apiToken({Authorization: 'Basic ' + apiKeyNotScoped, grantType: 'client_credentials'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					apiTokenAuthorizationNotScoped = result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(err);
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
					done(err);
				});
		});

	});

	describe('#testScopeProtected()', () => {

		it('should return with 401 with a bad api token', (done) => {
			securityApi.setToken('notoken');
			securityApi.testScopeProtected({name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					return done();
				});
		});

		it('should return with 403 with an api token not scoped', (done) => {
			securityApi.setToken(apiTokenAuthorizationNotScoped, 'Basic');
			securityApi.testScopeProtected({name: 'Justin'})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(403);
					return done();
				});
		});

		it('should execute with an api token', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.testScopeProtected({name: 'Justin'})
				.then((result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should execute with a password token', (done) => {
			securityApi.setToken(passwordAuthorization);
			securityApi.testScopeProtected({name: 'Justin'})
				.then((result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

	});

	describe('#refreshToken()', () => {

		it('should refresh a password token', (done) => {
			securityApi.refreshPasswordToken({
					refreshToken: refreshToken
				})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.should.not.have.properties(['account']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					refreshPasswordAuthorization = result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should execute with a password token', (done) => {
			securityApi.setToken(refreshPasswordAuthorization);
			securityApi.testScopeProtected({name: 'Justin'})
				.then((result) => {
					result.body.should.be.eql({message: 'Hello, Justin!'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

	});

	describe('#authorize', () => {

		it('should authorize without scopes', (done) => {
			securityApi.setToken(apiTokenAuthorizationNotScoped);
			securityApi.authorize({scopes: '', strict: false})
				.then((result) => {
					result.body.should.be.eql({message: 'success'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should authorize with scopes', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.authorize({scopes: 'test', strict: false})
				.then((result) => {
					result.body.should.be.eql({message: 'success'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should authorize with multiple scopes', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.authorize({scopes: 'test,test2,test3', strict: false})
				.then((result) => {
					result.body.should.be.eql({message: 'success'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should not authorize with one scope', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.authorize({scopes: 'test3', strict: false})
				.then(() => {
					done(new Error('Should not have authorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(403);
					done();
				});
		});

		it('should not authorize with multiple scopes', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.authorize({scopes: 'test3,test4', strict: false})
				.then(() => {
					done(new Error('Should not have authorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(403);
					done();
				});
		});

	});

	describe('#revokePasswordToken', () => {

		it('should revoke the password access token and refresh token', (done) => {
			securityApi.setToken(passwordAuthorization);
			securityApi.revokePasswordToken({refreshToken: refreshToken})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return with 401 with a bad password token', (done) => {
			securityApi.setToken(passwordAuthorization);
			securityApi.authorize({strict: true})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should revoke the password access via refresh token', (done) => {
			securityApi.setToken(refreshPasswordAuthorization);
			securityApi.revokePasswordToken()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});

		});

		it('should return with 401 with a bad password token that was from a refresh', (done) => {
			securityApi.setToken(refreshPasswordAuthorization);
			securityApi.authorize({strict: true})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

	});

	describe('#revokeApiToken', () => {

		it('should revoke the access token that was scoped', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.revokeApiToken()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return with 401 with a bad api token that was scoped', (done) => {
			securityApi.setToken(apiTokenAuthorizationScoped);
			securityApi.authorize({strict: true})
				.then(() => {
					done(new Error('Call should have failed unauthorized'));
				})
				.fail((err) => {
					err.response.statusCode.should.be.equal(401);
					done();
				});
		});

		it('should revoke the access token that was not scoped', (done) => {
			securityApi.setToken(apiTokenAuthorizationNotScoped);
			securityApi.revokeApiToken()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return with 401 with a bad api token that was not scoped', (done) => {
			securityApi.setToken(apiTokenAuthorizationNotScoped);
			securityApi.authorize({strict: true})
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