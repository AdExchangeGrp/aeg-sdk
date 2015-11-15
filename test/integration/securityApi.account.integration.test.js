'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');
var uuid = require('node-uuid');

/** @namespace result.body.should.have */
describe('securityApi - Account', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let registeredPasswordToken;
	let registeredRefreshToken;

	describe('#setup()', () => {

		it('should return admin scoped password token without error', (done) => {
			securityApi.passwordToken({username: 'test-admin@test.com', password: 'Pa$$w0rd', scope: 'platform:admin'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					adminPasswordToken = result.body.accessToken;
					adminRefreshToken = result.body.refreshToken;

					securityApi.setToken(adminPasswordToken);

					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#register()', () => {

		it('should register without error', (done) => {
			securityApi.registerAccount({
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
						registeredPasswordToken = result.body.accessToken;
						registeredRefreshToken = result.body.refreshToken;

						securityApi.setToken(registeredPasswordToken);

						done();
					})
					.fail((err) => {
						done(new ApiError(err));
					});
		});

	});

	describe('#updateAccount', () => {

		var newUserName = uuid.v4();

		it('should update account', (done) => {
			securityApi.updateAccount({username: newUserName})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should get updated account', (done) => {
			securityApi.getAccount()
				.then((result) => {
					result.body.username.should.be.equal(newUserName);
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	describe('#revokeAccount', () => {

		it('should revoke user', (done) => {
			securityApi.revokeAccount()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should not get the account', (done) => {
			securityApi.getAccount()
				.then(() => {
					done(new Error('Should not have retrieved account'));
				})
				.fail(() => {
					done();
				});
		});

	});

	describe('#teardown', () => {

		it('should revoke the refresh token for the admin', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.revokePasswordToken({
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
					accessToken: adminPasswordToken
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