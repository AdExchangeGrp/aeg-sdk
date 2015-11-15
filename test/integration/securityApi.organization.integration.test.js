'use strict';

let securityApi = require('../../lib/api/securityApi.js');
let ApiError = require('../../lib/errors/apiError.js');
let _ = require('underscore');

/** @namespace result.body.should.have */
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
			createOrg(adminPasswordToken, 'Test Affiliate Parent', null, function (err, result) {
				if (err) {
					return done(new ApiError(err));
				}

				console.log(result);

				done();

				//parentOrg = result.body.href;
				//
				//securityApi.getOrganization({Authorization: adminPasswordToken, organization: result.body.href})
				//	.then((result) => {
				//
				//		console.log(result);
				//
				//		result.body.should.have.properties(['href', 'name', 'customData']);
				//		result.body.customData.parent.should.be.equal(null);
				//		result.body.customData.children.should.be.an.Array;
				//		result.body.customData.children.length.should.be.equal(0);
				//		result.body.type.should.be.equal('affiliate');
				//		done();
				//	})
				//	.fail((err) => {
				//		return done(new ApiError(err));
				//	});
			});
		});

		it('should create the child organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Child', parentOrg, function (err, result) {
				if (err) {
					return done(new ApiError(err));
				}

				childOrg = result.body.href;

				//child
				securityApi.getOrganization({Authorization: adminPasswordToken, organization: result.body.href})
					.then((result) => {
						result.body.should.have.properties(['href', 'name', 'customData']);
						result.body.customData.parent.should.be.equal(parentOrg);
						result.body.customData.children.should.be.an.Array;
						result.body.customData.children.length.should.be.equal(0);
						result.body.type.should.be.equal('affiliate');

						//parent
						securityApi.getOrganization({Authorization: adminPasswordToken, organization: result.body.href})
							.then((result) => {
								result.body.should.have.properties(['href', 'name', 'customData']);
								result.body.customData.parent.should.be.equal(null);
								result.body.customData.children.should.be.an.Array;
								result.body.customData.children.length.should.be.equal(1);
								result.body.customData.children[0].should.be.equal(childOrg);
								result.body.type.should.be.equal('affiliate');
								done();
							})
							.fail((err) => {
								return done(new ApiError(err));
							});
					})
					.fail((err) => {
						return done(new ApiError(err));
					});
			});
		});

	});

	describe('#deleteOrganization', () => {

		it('should delete an organization', (done) => {

			securityApi.deleteOrganization({Authorization: adminPasswordToken, organization: parentOrg})
				.then((result) => {
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');

					//todo:test custom data

					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});


		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({Authorization: adminPasswordToken, organization: childOrg})
				.then((result) => {
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');

					//todo:test custom data

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
			createOrg(adminPasswordToken, 'Test Affiliate Parent', null, function (err, result) {
				if (err) {
					return done(err);
				}

				//todo:test custom data

				parentOrg = result;

				done();
			});
		});

		it('should create the child organization', (done) => {
			createOrg(adminPasswordToken, 'Test Affiliate Child', parentOrg, function (err, result) {
				if (err) {
					return done(err);
				}

				//todo:test custom data

				childOrg = result;

				done();
			});
		});

	});

	describe('#deleteOrganization', () => {

		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({Authorization: adminPasswordToken, organization: childOrg})
				.then((result) => {
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');

					//todo:test custom data

					done();
				})
				.fail((err) => {
					done(new ApiError(err));
				});
		});

		it('should delete an organization', (done) => {
			securityApi.deleteOrganization({Authorization: adminPasswordToken, organization: parentOrg})
				.then((result) => {
					result.body.should.have.properties(['message']);
					result.body.message.should.be.equal('success');

					//todo:test custom data

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
					Authorization: adminPasswordToken,
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
					Authorization: adminPasswordToken,
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

	var req = {
		Authorization: token,
		type: 'affiliate',
		name: name,
		createDirectory: true,
		parentOrganization: parentOrg
	};

	if (parentOrg) {
		req.parentOrganization = parentOrg;
	}

	securityApi.createOrganization(req)
		.then((result) => {
			console.log('argh');
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
