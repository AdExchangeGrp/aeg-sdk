'use strict';

import securityApi from '../../../src/api/securityApi';
import _ from 'lodash';
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
					done(err);
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

					securityApi.getOrganization({id: href})
						.then((result) => {
							result.body.should.have.properties(['organization', 'directory']);
							result.body.organization.should.have.properties(['href', 'name', 'customData']);
							should.not.exist(result.body.organization.customData.parent);
							result.body.organization.customData.children.should.be.an.Array;
							result.body.organization.customData.children.length.should.be.equal(0);
							result.body.organization.customData.type.should.be.equal('affiliate');
							result.body.organization.status.toLowerCase().should.be.equal('disabled');

							result.body.directory.should.have.properties(['href', 'name', 'status']);
							result.body.directory.href.should.be.a.String;
							result.body.directory.href.length.should.be.greaterThan(0);
							result.body.directory.name.should.be.a.String;
							result.body.directory.name.length.should.be.greaterThan(0);
							result.body.directory.status.should.be.a.String;
							result.body.directory.status.length.should.be.greaterThan(0);

							done();
						})
						.fail((err) => {
							done(err);
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
					securityApi.getOrganization({id: href})
						.then((result) => {
							result.body.should.have.properties(['organization']);
							result.body.organization.should.have.properties(['href', 'name', 'customData']);
							result.body.organization.customData.parent.should.be.equal(parentOrg);
							result.body.organization.customData.children.should.be.an.Array;
							result.body.organization.customData.children.length.should.be.equal(0);
							result.body.organization.customData.type.should.be.equal('affiliate');
							result.body.organization.status.toLowerCase().should.be.equal('disabled');

							//parent
							securityApi.getOrganization({id: parentOrg})
								.then((result) => {
									result.body.should.have.properties(['organization']);
									result.body.organization.should.have.properties(['href', 'name', 'customData']);
									should.not.exist(result.body.organization.customData.parent);
									result.body.organization.customData.children.should.be.an.Array;
									result.body.organization.customData.children.length.should.be.equal(1);
									result.body.organization.customData.children[0].should.be.equal(childOrg);
									result.body.organization.customData.type.should.be.equal('affiliate');
									done();
								})
								.fail((err) => {
									done(err);
								});
						})
						.fail((err) => {
							done(err);
						});
				});
			});

		});

		describe('#approveOrganization', () => {

			it('should approve an organization', (done) => {
				securityApi.approveOrganization({
						id: parentOrg,
						internalId: 'testInternalId',
						rename: 'Test Affiliate Rename'
					})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should get an approved organization', (done) => {
				securityApi.getOrganization({id: parentOrg})
					.then((result) => {
						result.body.should.have.properties(['organization', 'directory']);
						result.body.organization.should.have.properties(['status']);
						result.body.organization.status.toLowerCase().should.be.equal('enabled');
						result.body.organization.name.should.be.equal('Test Affiliate Rename');
						result.body.organization.customData.id.should.be.equal('testInternalId');
						result.body.directory.should.have.properties(['status']);
						result.body.directory.status.toLowerCase().should.be.equal('enabled');
						result.body.directory.name.should.be.equal('Test Affiliate Rename');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#deleteOrganization', () => {

			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({id: parentOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');

						//child
						securityApi.getOrganization({id: childOrg})
							.then((result) => {
								result.body.should.have.properties(['organization']);
								result.body.organization.should.have.properties(['href', 'name', 'customData']);
								should.not.exist(result.body.organization.customData.parent);
								result.body.organization.customData.children.should.be.an.Array;
								result.body.organization.customData.children.length.should.be.equal(0);
								result.body.organization.customData.type.should.be.equal('affiliate');
								done();
							})
							.fail((err) => {
								done(err);
							});
					})
					.fail((err) => {
						done(err);
					});
			});


			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({id: childOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
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
					securityApi.getOrganization({id: href})
						.then((result) => {
							result.body.should.have.properties(['organization']);
							result.body.organization.should.have.properties(['href', 'name', 'customData']);
							done();
						})
						.fail((err) => {
							done(err);
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
					securityApi.getOrganization({id: href})
						.then((result) => {
							result.body.should.have.properties(['organization']);
							result.body.organization.should.have.properties(['href', 'name', 'customData']);
							done();
						})
						.fail((err) => {
							done(err);
						});
				});
			});

		});

		describe('#deleteOrganization', () => {

			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({id: childOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');

						//parent
						securityApi.getOrganization({id: parentOrg})
							.then((result) => {
								result.body.should.have.properties(['organization']);
								result.body.organization.should.have.properties(['href', 'name', 'customData']);
								should.not.exist(result.body.organization.customData.parent);
								result.body.organization.customData.children.should.be.an.Array;
								result.body.organization.customData.children.length.should.be.equal(0);
								result.body.organization.customData.type.should.be.equal('affiliate');
								done();
							})
							.fail((err) => {
								done(err);
							});
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should delete an organization', (done) => {
				securityApi.deleteOrganization({id: parentOrg})
					.then((result) => {
						result.body.should.have.properties(['message']);
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('#teardown', () => {

		it('should revoke the password access token for the admin', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.revokePasswordToken({refreshToken: adminRefreshToken})
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

function createOrg(name, parentOrg, callback) {

	let req = {
		type: 'affiliate',
		name: name,
		createDirectory: true
	};

	if (parentOrg) {
		req.parentOrganization = parentOrg;
	}

	securityApi.createOrganization(req)
		.then((result) => {
			result.body.should.have.properties(['organization', 'directory', 'scopes']);
			result.body.organization.should.have.properties(['name', 'href', 'status']);
			result.body.organization.name.should.be.equal(name);
			result.body.organization.status.toLowerCase().should.be.equal('disabled');
			result.body.organization.href.length.should.be.greaterThan(0);
			result.body.directory.should.have.properties(['name', 'href', 'status']);
			result.body.directory.name.should.be.equal(name);
			result.body.directory.status.toLowerCase().should.be.equal('enabled');
			result.body.directory.href.length.should.be.greaterThan(0);

			_.isArray(result.body.scopes).should.be.ok;

			_.each(result.body.scopes, function (scope) {
				scope.should.have.properties(['name', 'href', 'status']);
				scope.name.should.be.equal('organization:admin');
				scope.status.toLowerCase().should.be.equal('enabled');
				scope.href.length.should.be.greaterThan(0);
			});

			callback(null, result.body.organization.href);
		})
		.fail((err) => {
			callback(err);
		});
}
