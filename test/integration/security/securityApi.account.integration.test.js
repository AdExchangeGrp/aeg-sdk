'use strict';

import securityApi from '../../../src/api/securityApi';
import uuid from 'node-uuid';
import _ from 'lodash';
import should from 'should';

/** @namespace result.body.should.have */
describe('securityApi - Account', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let registeredAccountHref;
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
					done(err);
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
					organization: 'https://api.stormpath.com/v1/organizations/FY4fz7C6gywxukmYolq3c',
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
					done(err);
				});
		});

	});

	describe('#updateAccount', () => {

		let givenName = uuid.v4();

		it('should update account', (done) => {
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

	});

	describe('#addRemoveScopesByHref', () => {

		describe('#addScopeToAccount', () => {

			it('should add scope to account', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.addScopeToAccount({
						account: registeredAccountHref,
						scope: 'https://api.stormpath.com/v1/groups/48GbYIkAPquYtceM7SXJmn'
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
						scope: 'https://api.stormpath.com/v1/groups/48GbYIkAPquYtceM7SXJmn'
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