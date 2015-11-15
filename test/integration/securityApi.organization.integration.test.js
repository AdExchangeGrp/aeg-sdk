'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');
let _ = require('underscore');

describe('securityApi - Organization', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let parentOrg;
	let childOrg;

	/*
	 * Create tokens
	 */

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

	/*
	 * This flow org A -> B
	 * Delete A then B
	 */

	describe('#createOrganization', () => {

		it('should create the parent organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Parent', null, function(err, result) {
				if (err) {
					return done(err);
				}

				parentOrg = result;

				done();
			});
		});

		it('should create the child organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Child', parentOrg, function(err, result) {
				if (err) {
					return done(err);
				}

				childOrg = result;

				done();
			});
		});

	});

	describe('#deleteOrganization', () => {

		it('should delete an organization', (done) => {

			securityApi.deleteOrganization({authorization: adminPasswordToken, organization: parentOrg})
				.then((result) => {
					console.log(result);
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});


		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({authorization: adminPasswordToken, organization: childOrg})
				.then((result) => {
					console.log(result);
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});
	});

	/*
	 * This flow org A -> B
	 * Delete B then A
	 */

	describe('#createOrganization', () => {

		it('should create the parent organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Parent', null, function(err, result) {
				if (err) {
					return done(err);
				}

				parentOrg = result;

				done();
			});
		});

		it('should create the child organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Child', parentOrg, function(err, result) {
				if (err) {
					return done(err);
				}

				childOrg = result;

				done();
			});
		});

	});

	describe('#deleteOrganization', () => {

		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({authorization: adminPasswordToken, organization: childOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(new ApiError(err));
					});
		});

		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({authorization: adminPasswordToken, organization: parentOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(new ApiError(err));
					});
		});

	});

	/*
	 * Cleanup tokens
	 */

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

function createOrg(token, name, parentOrg, callback) {
	securityApi.createOrganization({
			authorization: token,
			type: 'affiliate',
			name: name,
			createDirectory: true,
			parentOrganization: parentOrg
		})
		.then((result) => {
			result.body.should.have.properties(['organization', 'directory', 'scopes']);
			result.body.organization.should.have.properties(['name', 'href', 'status']);
			result.body.organization.name.should.be.equal(name);
			result.body.organization.status.should.be.equal('ENABLED');
			result.body.organization.href.length.should.be.greaterThan(0);
			result.body.directory.should.have.properties(['name', 'href', 'status']);
			result.body.directory.name.should.be.equal(name);
			result.body.directory.status.should.be.equal('ENABLED');
			result.body.directory.href.length.should.be.greaterThan(0);

			_.isArray(result.body.scopes).should.be.ok;

			_.each(result.body.scopes, function (scope) {
				console.log(scope);
				scope.should.have.properties(['name', 'href', 'status']);
				scope.name.should.be.equal('organization:admin');
				scope.status.should.be.equal('ENABLED');
				scope.href.length.should.be.greaterThan(0);
			});

			callback(null, result.body.organization.href);
		})
		.fail((err) => {
			callback(new ApiError(err));
		});
}
