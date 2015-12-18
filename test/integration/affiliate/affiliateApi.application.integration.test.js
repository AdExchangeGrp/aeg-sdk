'use strict';

import affiliateApi from '../../../src/api/affiliateApi';
import securityApi from '../../../src/api/securityApi';
import should from 'should';
import _ from 'lodash';

/** @namespace result.body.should.have */
describe('affiliateApi - Application', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let newUserToken;
	let applicationIdApprove;
	let applicationIdDeny;
	let organizationHref;

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

	describe('approve an application', () => {

		describe('#apply() to approve', () => {

			it('should create an application', (done) => {

				affiliateApi.applicationApply({
						contactEmail: 'test-apply-approve@test.com',
						contactPassword: 'Pa$$w0rd',
						contactGivenName: 'test-apply-given',
						contactSurname: 'test-apply-sur',
						contactTitle: 'test-apply-title',
						contactPhone: '410-349-6457',
						contactImScreenName: 'test-apply-screen-name',
						contactImService: 'aim',
						contactAddress: 'test-apply-address',
						contactSuite: 'test-apply-suite',
						contactCity: 'test-apply-city',
						contactState: 'test-apply-state',
						contactPostalCode: '12345',
						contactCountry: 'test-apply-country',
						company: 'test-apply-company',
						companyTaxId: 'test-apply-tax-id',
						companyTaxClass: 'llc',
						companyPayableTo: 'contact',
						companyPayBy: 'check',
						companyAddress: 'test-apply-company-address',
						companySuite: 'test-apply-company-suite',
						companyCity: 'test-apply-company-city',
						companyState: 'test-apply-company-state',
						companyPostalCode: '67890',
						companyCountry: 'test-apply-company-country',
						marketingUrl: 'http://test',
						marketingSiteCategory: 'test-apply-marketing-category',
						marketingAnticipatedDailyVolume: 12345,
						marketingTrafficSources: 'test-apply-traffic-sources',
						marketingComments: 'test-apply-marketing-comments',
						marketingHowMarketed: 'test-apply-merketing-how'
					})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id']);
						result.body.application.approved.should.not.be.ok;
						result.body.application.disapproved.should.not.be.ok;

						organizationHref = result.body.application.organization.href;

						//default timezone
						result.body.application.contact.timezone.should.be.equal('America/New_York');
						applicationIdApprove = result.body.application.id;

						done();
					})
					.fail((err) => {
						done(err);
					});

			});

			it('should return token for new account', (done) => {
				securityApi.passwordToken({username: 'test-apply-approve@test.com', password: 'Pa$$w0rd'})
					.then((result) => {
						newUserToken = result.body.accessToken;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return account with custom data', (done) => {
				securityApi.setToken(newUserToken);
				securityApi.getAccount()
					.then((result) => {
						result.body.account.customData.title.should.be.equal('test-apply-title');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#applicationValidateAffiliateId', () => {

			it('should not validate an existing affiliateId', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationValidateAffiliateId({id: applicationIdApprove})
				.then(() => {
					done(new Error('Should not validate with an existing name key'));
				})
				.fail(() => {
					done();
				});
			});

			it('should not validate an affiliateId with an invalid format', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationValidateAffiliateId({id: '999999asd'})
					.then(() => {
						done(new Error('Should not validate with an existing name key'));
					})
					.fail(() => {
						done();
					});
			});

			it('should validate an affiliateId', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationValidateAffiliateId({id: '0000999999'})
					.then((result) => {
						result.body.message.should.be.equal('success');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('#applicationApprove()', () => {

			it('should approve an application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationApprove({id: applicationIdApprove, affiliateId: '999999'})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id', 'approver']);
						result.body.application.approved.should.be.ok;
						should.exist(result.body.application.approvalDate);
						result.body.application.disapproved.should.not.be.ok;
						_.isObject(result.body.application.approver).should.be.ok;
						result.body.application.approver.should.have.properties(['href', 'givenName', 'surname']);
						result.body.application.approver.href.should.be.equal('https://api.stormpath.com/v1/accounts/6JNeqPfCOnCibnCI0rr9eS');
						result.body.application.approver.givenName.should.not.be.empty;
						result.body.application.approver.surname.should.not.be.empty;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return account with custom data', (done) => {
				securityApi.setToken(newUserToken);
				securityApi.getAccount()
					.then((result) => {
						result.body.account.customData.title.should.be.equal('test-apply-title');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return organization with custom data', (done) => {
				securityApi.setToken(adminPasswordToken);
				securityApi.getOrganization({id: organizationHref})
					.then((result) => {
						result.body.organization.customData.should.have.properties(['type']);
						result.body.organization.customData.type.should.be.equal('affiliate');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('get application', () => {

			it('should get the application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.application({id: applicationIdApprove})
					.then((result) => {
						should.exist(result);
						should.exist(result.body);
						result.body.should.have.properties(['application']);
						result.body.application.should.have.properties(['id']);
						result.body.application.id.should.be.equal(applicationIdApprove);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('get applications', () => {

			it('should get the application list', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applications()
					.then((result) => {
						should.exist(result);
						should.exist(result.body);
						result.body.should.have.properties(['applications']);
						_.isArray(result.body.applications).should.be.ok;
						result.body.applications.length.should.be.greaterThan(0);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('cleanup', () => {

			it('should delete an application', (done) => {
				affiliateApi.applicationDelete({id: applicationIdApprove})
					.then((result) => {
						should.exist(result);
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

	describe('deny an application', () => {

		describe('#apply() to deny', () => {

			it('should create an application', (done) => {

				affiliateApi.setToken(null);
				affiliateApi.applicationApply({
						contactEmail: 'test-apply-deny@test.com',
						contactPassword: 'Pa$$w0rd',
						contactGivenName: 'test-apply-given',
						contactSurname: 'test-apply-sur',
						contactTitle: 'test-apply-title',
						contactPhone: '410-349-6457',
						contactImScreenName: 'test-apply-screen-name',
						contactImService: 'aim',
						contactAddress: 'test-apply-address',
						contactSuite: 'test-apply-suite',
						contactCity: 'test-apply-city',
						contactState: 'test-apply-state',
						contactPostalCode: '12345',
						contactCountry: 'test-apply-country',
						contactTimezone: 'America/Los_Angeles',
						company: 'test-apply-company',
						companyTaxId: 'test-apply-tax-id',
						companyTaxClass: 'llc',
						companyPayableTo: 'contact',
						companyPayBy: 'check',
						companyAddress: 'test-apply-company-address',
						companySuite: 'test-apply-company-suite',
						companyCity: 'test-apply-company-city',
						companyState: 'test-apply-company-state',
						companyPostalCode: '67890',
						companyCountry: 'test-apply-company-country',
						marketingUrl: 'http://test',
						marketingSiteCategory: 'test-apply-marketing-category',
						marketingAnticipatedDailyVolume: 12345,
						marketingTrafficSources: 'test-apply-traffic-sources',
						marketingComments: 'test-apply-marketing-comments',
						marketingHowMarketed: 'test-apply-merketing-how'
					})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id']);
						result.body.application.approved.should.not.be.ok;
						result.body.application.disapproved.should.not.be.ok;
						result.body.application.contact.timezone.should.be.equal('America/Los_Angeles');

						applicationIdDeny = result.body.application.id;

						done();
					})
					.fail((err) => {
						done(err);
					});

			});

		});

		describe('#applicationDeny()', () => {

			it('should deny an application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationDeny({id: applicationIdDeny})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id', 'approver']);
						result.body.application.approved.should.not.be.ok;
						should.exist(result.body.application.approvalDate);
						result.body.application.disapproved.should.be.ok;
						_.isObject(result.body.application.approver).should.be.ok;
						result.body.application.approver.should.have.properties(['href', 'givenName', 'surname']);
						result.body.application.approver.href.should.be.equal('https://api.stormpath.com/v1/accounts/6JNeqPfCOnCibnCI0rr9eS');
						result.body.application.approver.givenName.should.not.be.empty;
						result.body.application.approver.surname.should.not.be.empty;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('get application', () => {

			it('should get the application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.application({id: applicationIdDeny})
					.then((result) => {
						should.exist(result);
						should.exist(result.body);
						result.body.should.have.properties(['application']);
						result.body.application.should.have.properties(['id']);
						result.body.application.id.should.be.equal(applicationIdDeny);
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('cleanup', () => {

			it('should delete an application', (done) => {
				affiliateApi.applicationDelete({id: applicationIdDeny})
					.then((result) => {
						should.exist(result);
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