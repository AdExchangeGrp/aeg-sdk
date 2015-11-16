'use strict';

import securityApi from '../../src/api/securityApi.js';
import ApiError from '../../src/errors/apiError.js';
import _ from 'underscore';
import should from 'should';

/** @namespace result.body.should.have */
describe('securityApi - Organization', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let parentOrg;
	let childOrg;

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

	describe('#Delete the parent and then the child', () => {

		describe('#createOrganization', () => {

			it('should create the parent organization', (done) => {
				createOrg('Test Affiliate Parent', null, function (err, href) {
					if (err) {
						return done(err);
					}

					parentOrg = href;

					securityApi.getOrganization({organization: href})
						.then((result) => {
							result.body.should.have.properties(['href', 'name', 'customData']);
							should.not.exist(result.body.customData.parent);
							result.body.customData.children.should.be.an.Array;
							result.body.customData.children.length.should.be.equal(0);
							result.body.customData.type.should.be.equal('affiliate');
							done();
						})
						.fail((err) => {
							return done(new ApiError(err));
						});
				});
			});

			it('should create the child organization', (done) => {
				createOrg('Test Affiliate Child', parentOrg, function (err, href) {
					if (err) {
						return done(err);
					}

					childOrg = href;

					//child
					securityApi.getOrganization({organization: href})
						.then((result) => {

							result.body.should.have.properties(['href', 'name', 'customData']);
							result.body.customData.parent.should.be.equal(parentOrg);
							result.body.customData.children.should.be.an.Array;
							result.body.customData.children.length.should.be.equal(0);
							result.body.customData.type.should.be.equal('affiliate');

							//parent
							securityApi.getOrganization({organization: parentOrg})
								.then((result) => {
									result.body.should.have.properties(['href', 'name', 'customData']);
									should.not.exist(result.body.customData.parent);
									result.body.customData.children.should.be.an.Array;
									result.body.customData.children.length.should.be.equal(1);
									result.body.customData.children[0].should.be.equal(childOrg);
									result.body.customData.type.should.be.equal('affiliate');
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
				securityApi.deleteOrganization({organization: parentOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');

						//child
						securityApi.getOrganization({organization: childOrg})
							.then((result) => {

								result.body.should.have.properties(['href', 'name', 'customData']);
								should.not.exist(result.body.customData.parent);
								result.body.customData.children.should.be.an.Array;
								result.body.customData.children.length.should.be.equal(0);
								result.body.customData.type.should.be.equal('affiliate');
								done();
							})
							.fail((err) => {
								done(new ApiError(err));
							});
					})
					.fail((err) => {
						done(new ApiError(err));
					});
			});


			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({organization: childOrg})
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

	});

	describe('#Delete the child and then the parent', () => {

		describe('#createOrganization', () => {

			it('should create the parent organization', (done) => {
				createOrg('Test Affiliate Parent', null, function (err, href) {
					if (err) {
						return done(err);
					}

					parentOrg = href;

					//parent
					securityApi.getOrganization({organization: href})
						.then((result) => {
							result.body.should.have.properties(['href', 'name', 'customData']);
							done();
						})
						.fail((err) => {
							return done(new ApiError(err));
						});
				});
			});

			it('should create the child organization', (done) => {
				createOrg('Test Affiliate Child', parentOrg, function (err, href) {
					if (err) {
						return done(err);
					}

					childOrg = href;

					//parent
					securityApi.getOrganization({organization: href})
						.then((result) => {
							result.body.should.have.properties(['href', 'name', 'customData']);
							done();
						})
						.fail((err) => {
							return done(new ApiError(err));
						});
				});
			});

		});

		describe('#deleteOrganization', () => {

			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({organization: childOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');

						//parent
						securityApi.getOrganization({organization: parentOrg})
							.then((result) => {

								result.body.should.have.properties(['href', 'name', 'customData']);
								should.not.exist(result.body.customData.parent);
								result.body.customData.children.should.be.an.Array;
								result.body.customData.children.length.should.be.equal(0);
								result.body.customData.type.should.be.equal('affiliate');
								done();
							})
							.fail((err) => {
								done(new ApiError(err));
							});
					})
					.fail((err) => {
						done(new ApiError(err));
					});
			});

			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({organization: parentOrg})
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

	});

	describe('#teardown', () => {

		it('should revoke the refresh token for the admin', (done) => {
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

function createOrg(name, parentOrg, callback) {

	let req = {
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
