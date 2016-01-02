'use strict';

import securityApi from '../../../src/api/security-api';
import _ from 'lodash';
import should from 'should';
import setup from '../setup';

/** @namespace result.body.should.have */
describe('securityApi - Organization', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let parentOrg;
	let childOrg;

	describe('setup', () => {

		it('should setup', (done) => {

			setup.getAdminPasswordToken((err, result) => {
				if (err) {
					done(err);
				} else {
					adminPasswordToken = result.accessToken;
					adminRefreshToken = result.refreshToken;
					securityApi.setToken(adminPasswordToken);
					done();
				}
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
							result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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
							result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
							result.body.organization.customData.parent.should.be.equal(parentOrg);
							result.body.organization.customData.children.should.be.an.Array;
							result.body.organization.customData.children.length.should.be.equal(0);
							result.body.organization.customData.type.should.be.equal('affiliate');
							result.body.organization.status.toLowerCase().should.be.equal('disabled');

							//parent
							securityApi.getOrganization({id: parentOrg})
								.then((result) => {
									result.body.should.have.properties(['organization']);
									result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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
						rename: 'Test-Affiliate-Rename'
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
						result.body.organization.name.should.be.equal('Test-Affiliate-Rename');
						result.body.organization.nameKey.should.be.equal('Test-Affiliate-Rename');
						result.body.directory.should.have.properties(['status']);
						result.body.directory.status.toLowerCase().should.be.equal('enabled');
						result.body.directory.name.should.be.equal('Test-Affiliate-Rename');
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
								result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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
							result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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
							result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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
								result.body.organization.should.have.properties(['href', 'name', 'nameKey', 'customData']);
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

	describe('#getOrganizations()', () => {

		it('should get all organizations', (done) => {
			securityApi.getOrganizations()
				.then((result) => {
					should.exist(result.body.organizations);
					_.isArray(result.body.organizations).should.be.ok;
					result.body.organizations.length.should.be.greaterThan(0);

					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should get all affilite organizations', (done) => {
			securityApi.getOrganizations({type: 'affiliate'})
				.then((result) => {
					should.exist(result.body.organizations);
					_.isArray(result.body.organizations).should.be.ok;
					result.body.organizations.length.should.be.greaterThan(0);

					_.each(result.body.organizations, (organization) => {
						organization.customData.type.should.be.equal('affiliate');
					});

					done();
				})
				.fail((err) => {
					done(err);
				});
		});

	});

	describe('teardown', () => {

		it('should teardown', (done) => {

			setup.revokePasswordToken(adminPasswordToken, adminRefreshToken, done);

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
			result.body.organization.should.have.properties(['name', 'href', 'nameKey', 'status']);
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
