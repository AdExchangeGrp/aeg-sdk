'use strict';

import affiliateApi from '../../../src/api/affiliate-api';
import securityApi from '../../../src/api/security-api';
import should from 'should';
import _ from 'lodash';
import setup from '../setup';

/** @namespace result.body.should.have */
describe('affiliateApi - Application', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let newUserToken;
	let newUserHref;
	let applicationIdApprove;
	let applicationIdToApproveAffiliateIdTwice;
	let applicationIdDeny;
	let organizationHref;


	describe('setup', () => {

		it('should setup', (done) => {
			setup.getAdminPasswordToken((err, result) => {
				if (err) {
					done(err);
				} else {
					adminPasswordToken = result.accessToken;
					adminRefreshToken = result.refreshToken;
					done();
				}
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
						contactPhone: '+1-410-349.6457',
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
						result.body.application.status.should.be.equal('SUBMITTED');

						organizationHref = result.body.application.organization.href;
						newUserHref = result.body.application.account.href;

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
				securityApi.passwordToken({
						username: 'test-apply-approve@test.com',
						password: 'Pa$$w0rd'
					})
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

			it('should create an application to approve an affiliate id twice', (done) => {

				affiliateApi.applicationApply({
						contactEmail: 'test-apply-approve2@test.com',
						contactPassword: 'Pa$$w0rd',
						contactGivenName: 'test-apply-given',
						contactSurname: 'test-apply-sur',
						contactTitle: 'test-apply-title',
						contactPhone: '+1-410-349.6457',
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
						result.body.application.status.should.be.equal('SUBMITTED');

						organizationHref = result.body.application.organization.href;
						newUserHref = result.body.application.account.href;

						//default timezone
						result.body.application.contact.timezone.should.be.equal('America/New_York');
						applicationIdToApproveAffiliateIdTwice = result.body.application.id;

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
						result.body.application.status.should.be.equal('APPROVED');
						should.exist(result.body.application.approvalDate);
						_.isObject(result.body.application.approver).should.be.ok;
						result.body.application.approver.should.have.properties(['href', 'givenName', 'surname']);
						result.body.application.approver.href.should.be.equal('https://api.stormpath.com/v1/accounts/22gdzGBJWvXasOme1kiWkW');
						result.body.application.approver.givenName.should.not.be.empty;
						result.body.application.approver.surname.should.not.be.empty;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not approve an application already approved or denied', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationApprove({id: applicationIdApprove, affiliateId: '8888888'})
					.then(() => {
						done(new Error('Should not have approved'));
					})
					.fail((err) => {
						err.body.message.should.be.equal('Application is not in a submitted state');
						done();
					});
			});

			it('should not approve an application with the same affiliateId', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationApprove({id: applicationIdToApproveAffiliateIdTwice, affiliateId: '999999'})
					.then(() => {
						done(new Error('Should not have approved an application with an existing affiliateId'));
					})
					.fail((err) => {
						err.body.message.should.be.equal('Affiliate already exists');
						done();
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

			it('should get the application list for a specific user', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applications({account: newUserHref})
					.then((result) => {
						should.exist(result);
						should.exist(result.body);
						result.body.should.have.properties(['applications']);
						_.isArray(result.body.applications).should.be.ok;
						result.body.applications.length.should.be.greaterThan(0);
						_.each(result.body.applications, (application) => {
							application.account.href.should.be.equal(newUserHref);
						});
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

			it('should delete an application', (done) => {
				affiliateApi.applicationDelete({id: applicationIdToApproveAffiliateIdTwice})
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
						result.body.application.status.should.be.equal('SUBMITTED');
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
						result.body.application.status.should.be.equal('DENIED');
						should.exist(result.body.application.approvalDate);
						_.isObject(result.body.application.approver).should.be.ok;
						result.body.application.approver.should.have.properties(['href', 'givenName', 'surname']);
						result.body.application.approver.href.should.be.equal('https://api.stormpath.com/v1/accounts/22gdzGBJWvXasOme1kiWkW');
						result.body.application.approver.givenName.should.not.be.empty;
						result.body.application.approver.surname.should.not.be.empty;
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should not deny an application already denied or approved', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationDeny({id: applicationIdDeny})
					.then(() => {
						done(new Error('Application should not have been denied'));
					})
					.fail((err) => {
						err.body.message.should.be.equal('Application is not in a submitted state');
						done();
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

	describe('teardown', () => {

		it('should teardown', (done) => {

			setup.revokePasswordToken(adminPasswordToken, adminRefreshToken, done);

		});

	});

});