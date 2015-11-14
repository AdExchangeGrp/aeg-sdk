'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');

describe('securityApi - Account', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let registeredPasswordToken;
	let registeredRefreshToken;

	describe('#passwordToken()', () => {

		it('should return scoped password token without error', (done) => {
			securityApi.passwordToken({username: 'test-admin@test.com', password: 'Pa$$w0rd', scope: 'platform:admin'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					adminPasswordToken = 'Bearer ' + result.body.accessToken;
					adminRefreshToken = result.body.refreshToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#register()', () => {

		it('should return without error', (done) => {
			securityApi.registerAccount({
					authorization: adminPasswordToken,
					email: 'test@test.com',
					password: 'Pa$$w0rd',
					givenName: 'test',
					surname: 'test',
					username: 'test',
					organization: 'https://api.stormpath.com/v1/organizations/FY4fz7C6gywxukmYolq3c'
				})
				.then((result) => {
					result.body.should.have.properties(['href', 'status']);
					result.body.href.should.be.a.String;
					result.body.href.length.should.be.greaterThan(0);
					result.body.status.should.be.a.String;
					result.body.status.length.should.be.greaterThan(0);
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#passwordToken()', () => {

		it('should return scoped password token without error', (done) => {
			securityApi.passwordToken({
					username: 'test@test.com',
					password: 'Pa$$w0rd',
					scope: 'platform:admin',
					organization: 'https://api.stormpath.com/v1/organizations/FY4fz7C6gywxukmYolq3c'
				})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					registeredPasswordToken = 'Bearer ' + result.body.accessToken;
					registeredRefreshToken = result.body.refreshToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#revokeAccount', () => {

		it('should revoke user', (done) => {
			securityApi.revokeAccount({authorization: registeredPasswordToken})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#revokeTokens', () => {

		it('should revoke the refresh token for the admin', (done) => {
			securityApi.revokePasswordToken({
					authorization: adminPasswordToken,
					accessToken: adminRefreshToken
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should revoke the password access token for the admin', (done) => {
			securityApi.revokePasswordToken({
					authorization: adminPasswordToken,
					accessToken: adminPasswordToken.split(' ')[1]
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
});