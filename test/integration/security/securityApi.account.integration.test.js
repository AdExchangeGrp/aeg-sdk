'use strict';

import securityApi from '../../../src/api/securityApi';
import uuid from 'node-uuid';
import _ from 'lodash';
import should from 'should';
import setup from '../setup';

const testEmail = 'test-account13@test.com';
const testUsername = 'test-account13';

/** @namespace result.body.should.have */
describe('securityApi - Account', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let adminHref;
	let registeredAccountHref;
	let registeredPasswordToken;
	let registeredRefreshToken;

	describe('setup', () => {

		it('should setup', (done) => {

			setup.getAdminPasswordToken((err, result) => {
				if (err) {
					done(err);
				} else {
					adminPasswordToken = result.accessToken;
					adminRefreshToken = result.refreshToken;
					adminHref = result.account.href;
					securityApi.setToken(adminPasswordToken);
					done();
				}
			});

		});

	});

	describe('#register()', () => {

		it('should register without error', (done) => {
			securityApi.registerAccount({
					email: testEmail,
					password: 'Pa$$w0rd',
					givenName: 'test',
					surname: 'test',
					username: testUsername,
					organization: 'https://api.stormpath.com/v1/organizations/5ejJyvdIsJNZ2j5clY0o1l',
					customData: JSON.stringify({
						test: 'test',
						org: {
							href: 'test'
						}
					})
				})
				.then((result) => {
					result.body.should.have.properties(['account']);
					(_.isObject(result.body.account)).should.be.ok;
					result.body.account.should.have.properties(['href', 'status', 'email', 'givenName', 'surname', 'customData']);
					result.body.account.href.should.be.a.String;
					result.body.account.href.length.should.be.greaterThan(0);

					registeredAccountHref = result.body.account.href;

					result.body.account.status.should.be.a.String;
					result.body.account.status.length.should.be.greaterThan(0);
					result.body.account.status.toLowerCase().should.be.equal('enabled');
					result.body.account.givenName.should.be.a.String;
					result.body.account.givenName.length.should.be.greaterThan(0);
					result.body.account.surname.should.be.a.String;
					result.body.account.surname.length.should.be.greaterThan(0);
					result.body.account.customData.should.be.an.Object;
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should return password token without error', (done) => {
			securityApi.passwordToken({
					username: testEmail,
					password: 'Pa$$w0rd',
					organization: 'https://api.stormpath.com/v1/organizations/5ejJyvdIsJNZ2j5clY0o1l'
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
					done(err);
				});
		});

	});

	describe('#updateAccount', () => {

		let givenName = uuid.v4();

		it('should update account using own rights', (done) => {
			securityApi.setToken(registeredPasswordToken);
			securityApi.updateAccountProfile({
					givenName: givenName,
					id: registeredAccountHref,
					customData: JSON.stringify({
						testUpdate: 'test-me',
						org: {
							id: 'test'
						}
					})
				})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should get updated account', (done) => {
			securityApi.getAccount()
				.then((result) => {
					result.body.should.have.properties(['account']);
					(_.isObject(result.body.account)).should.be.ok;
					result.body.account.should.have.properties(['href', 'status', 'email', 'givenName', 'surname', 'customData']);
					result.body.account.href.should.be.a.String;
					result.body.account.href.length.should.be.greaterThan(0);
					result.body.account.status.should.be.a.String;
					result.body.account.status.length.should.be.greaterThan(0);
					result.body.account.status.toLowerCase().should.be.equal('enabled');
					result.body.account.givenName.should.be.a.String;
					result.body.account.givenName.length.should.be.greaterThan(0);
					result.body.account.surname.should.be.a.String;
					result.body.account.surname.length.should.be.greaterThan(0);
					result.body.account.customData.should.be.an.Object;
					result.body.account.givenName.should.be.equal(givenName);
					result.body.account.customData.should.have.properties(['test', 'testUpdate', 'org']);
					result.body.account.customData.test.should.be.equal('test');
					result.body.account.customData.testUpdate.should.be.equal('test-me');
					result.body.account.customData.org.should.have.properties(['href', 'id']);
					result.body.account.customData.org.should.eql({href: 'test', id: 'test'});
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should not update another account', (done) => {
			securityApi.updateAccountProfile({
					givenName: givenName,
					id: adminHref,
					customData: JSON.stringify({
						testUpdate: 'test-me',
						org: {
							id: 'test'
						}
					})
				})
				.then((result) => {
					done(new Error('Should not have updated account'));
				})
				.fail((err) => {
					done();
				});
		});

		it('should update another account using admin rights', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.updateAccountProfile({
					givenName: givenName,
					id: registeredAccountHref,
					customData: JSON.stringify({
						testUpdate: 'test-me',
						org: {
							id: 'test'
						}
					})
				})
				.then((result) => {
					done();
				})
				.fail((err) => {
					done(err);
				});
		});
	});

	describe('#addRemoveScopesByHref', () => {

		describe('#addScopeToAccount', () => {

			it('should add scope to account', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.addScopeToAccount({
						account: registeredAccountHref,
						scope: 'https://api.stormpath.com/v1/groups/5stLcVH2AgzVo1lgsBVCrc'
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should get the account and its test scope', (done) => {
				securityApi.setToken(registeredPasswordToken);
				securityApi.getAccount()
					.then((result) => {
						_.isArray(result.body.account.scopes).should.be.ok;
						result.body.account.scopes.length.should.be.greaterThan(0);
						let test = _.find(result.body.account.scopes, (scope) => {
							return scope.name === 'test';
						});
						should.exist(test);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#removeScopeFromAccount', () => {

			it('should remove a scope from an account', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.removeScopeFromAccount({
						account: registeredAccountHref,
						scope: 'https://api.stormpath.com/v1/groups/5stLcVH2AgzVo1lgsBVCrc'
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should get the account without its account scope', (done) => {
				securityApi.setToken(registeredPasswordToken);
				securityApi.getAccount()
					.then((result) => {
						_.isArray(result.body.account.scopes).should.be.ok;
						let test = _.find(result.body.account.scopes, (scope) => {
							return scope.name === 'test';
						});
						should.not.exist(test);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('#addRemoveScopesByName', () => {

		describe('#addScopeToAccount', () => {

			it('should add scope to account', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.addScopeToAccount({
						account: registeredAccountHref,
						scope: 'test'
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should get the account and its test scope', (done) => {
				securityApi.setToken(registeredPasswordToken);
				securityApi.getAccount()
					.then((result) => {
						let test = _.find(result.body.account.scopes, (scope) => {
							return scope.name === 'test';
						});
						should.exist(test);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#removeScopeFromAccount', () => {

			it('should remove a scope from an account', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.removeScopeFromAccount({
						account: registeredAccountHref,
						scope: 'test'
					})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should get the account without its account scope', (done) => {
				securityApi.setToken(registeredPasswordToken);
				securityApi.getAccount()
					.then((result) => {
						let test = _.find(result.body.account.scopes, (scope) => {
							return scope.name === 'test';
						});
						should.not.exist(test);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

	});

	describe('#validateAccountEmail', () => {

		it('should validate an account email', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.validateAccountEmail({email: 'test123456789@test.com'})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should not validate an account email', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.validateAccountEmail({email: testEmail})
				.then(() => {
					done(new Error('Should not have validated new account email'));
				})
				.fail(() => {
					done();
				});
		});

		it('should not validate an account email with a bad email pattern', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.validateAccountEmail({email: '@arg.com'})
				.then(() => {
					done(new Error('Should not have validated new account email'));
				})
				.fail(() => {
					done();
				});
		});

	});

	describe('#revokeAccount', () => {

		it('should revoke user', (done) => {
			securityApi.setToken(registeredPasswordToken);
			securityApi.revokeAccount()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
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

	describe('teardown', () => {

		it('should teardown', (done) => {

			setup.revokePasswordToken(adminPasswordToken, adminRefreshToken, done);

		});

	});

});