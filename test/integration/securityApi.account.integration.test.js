'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');

describe('securityApi', () => {

	let adminPasswordToken;
	//let registeredPasswordToken;

	describe('#passwordToken()', () => {

		it('should return scoped password token without error', (done) => {
			securityApi.passwordToken({username: 'test-admin@test.com', password: 'Pa$$w0rd', scope: 'platform:admin'})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
					result.body.accessToken.should.be.a.String;
					result.body.accessToken.length.should.be.greaterThan(0);
					adminPasswordToken = 'Bearer ' + result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

	});

	//todo:auto-verify this user
	//describe('#register()', () => {
	//
	//	it('should return without error', (done) => {
	//		securityApi.registerAccount({
	//				authorization: passwordToken,
	//				email: 'test@test.com',
	//				password: 'Pa$$w0rd',
	//				givenName: 'test',
	//				surname: 'test',
	//				username: 'test',
	//				organization: 'https://api.stormpath.com/v1/organizations/FY4fz7C6gywxukmYolq3c'
	//			})
	//			.then((result) => {
	//				result.body.should.have.properties(['href', 'status']);
	//				result.body.href.should.be.a.String;
	//				result.body.href.length.should.be.greaterThan(0);
	//				result.body.status.should.be.a.String;
	//				result.body.status.length.should.be.greaterThan(0);
	//				done();
	//			})
	//			.fail((err) => {
	//				done(new ApiError(err));
	//			});
	//	});
	//
	//});

	//todo: login the new user
	//describe('#passwordToken()', () => {
	//
	//	it('should return scoped password token without error', (done) => {
	//		securityApi.passwordToken({username: 'test-admin@test.com', password: 'Pa$$w0rd', scope: 'platform:admin'})
	//				.then((result) => {
	//					result.body.should.have.properties(['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'scope']);
	//					result.body.accessToken.should.be.a.String;
	//					result.body.accessToken.length.should.be.greaterThan(0);
	//					passwordToken = 'Bearer ' + result.body.accessToken;
	//					done();
	//				})
	//				.fail((err) => {
	//					done(new ApiError(err));
	//				});
	//	});
	//
	//});

	//todo: revoke the newly created user

	describe('#revokePasswordToken', () => {

		it('should revoke the password access token with scope', (done) => {
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