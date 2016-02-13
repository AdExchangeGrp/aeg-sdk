'use strict';

import affiliateApi from '../../../src/api/affiliate-api';
import securityApi from '../../../src/api/security-api';
import should from 'should';
import _ from 'lodash';
import setup from '../setup';

const applyEmail = 	'test-apply-approve1@test.com';
const applyEmail2 = 'test-apply-approve2@test.com';

/** @namespace result.body.should.have */
describe('affiliateApi - Application', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let newUserToken;
	let newUserHref;
	let applicationIdApprove;
	let applicationIdToApproveAffiliateIdTwice;
	let applicationIdDeny;
	let denyUserToken;
	let denyApplicationOrganizationId;
	let denyAccountId;
	let applicationIdResubmit;
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
						'contact.email': applyEmail,
						'contact.password': 'Pa$$w0rd',
						'contact.givenName': 'test-apply-given',
						'contact.surname': 'test-apply-sur',
						'contact.title': 'test-apply-title',
						'contact.phone': '+1-410-349.6457',
						'contact.im.screenName': 'test-apply-screen-name',
						'contact.im.service': 'aim',
						'contact.address.address': 'test-apply-address',
						'contact.address.suite': 'test-apply-suite',
						'contact.address.city': 'test-apply-city',
						'contact.address.state': 'test-apply-state',
						'contact.address.postalCode': '12345',
						'contact.address.country': 'test-apply-country',
						'company.company': 'test-apply-company',
						'company.taxId': 'test-apply-tax-id',
						'company.taxClass': 'llc',
						'company.payableTo': 'contact',
						'company.payBy': 'check',
						'company.address.address': 'test-apply-company-address',
						'company.address.suite': 'test-apply-company-suite',
						'company.address.city': 'test-apply-company-city',
						'company.address.state': 'test-apply-company-state',
						'company.address.postalCode': '67890',
						'company.address.country': 'test-apply-company-country',
						'marketing.url': 'http://test',
						'marketing.siteCategory': 'test-apply-marketing-category',
						'marketing.anticipatedDailyVolume': 12345,
						'marketing.trafficSources': 'test-apply-traffic-sources',
						'marketing.comments': 'test-apply-marketing-comments',
						'marketing.howMarketed': 'test-apply-merketing-how'
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
						username: applyEmail,
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
						'contact.email': applyEmail2,
						'contact.password': 'Pa$$w0rd',
						'contact.givenName': 'test-apply-given',
						'contact.surname': 'test-apply-sur',
						'contact.title': 'test-apply-title',
						'contact.phone': '+1-410-349.6457',
						'contact.im.screenName': 'test-apply-screen-name',
						'contact.im.service': 'aim',
						'contact.address.address': 'test-apply-address',
						'contact.address.suite': 'test-apply-suite',
						'contact.address.city': 'test-apply-city',
						'contact.address.state': 'test-apply-state',
						'contact.address.postalCode': '12345',
						'contact.address.country': 'test-apply-country',
						'company.company': 'test-apply-company',
						'company.taxId': 'test-apply-tax-id',
						'company.taxClass': 'llc',
						'company.payableTo': 'contact',
						'company.payBy': 'check',
						'company.address.address': 'test-apply-company-address',
						'company.address.suite': 'test-apply-company-suite',
						'company.address.city': 'test-apply-company-city',
						'company.address.state': 'test-apply-company-state',
						'company.address.postalCode': '67890',
						'company.address.country': 'test-apply-company-country',
						'marketing.url': 'http://test',
						'marketing.siteCategory': 'test-apply-marketing-category',
						'marketing.anticipatedDailyVolume': 12345,
						'marketing.trafficSources': 'test-apply-traffic-sources',
						'marketing.comments': 'test-apply-marketing-comments',
						'marketing.howMarketed': 'test-apply-merketing-how'
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

			it('should not validate an existing affiliateId', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationValidateAffiliateId({id: '999999'})
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
						'contact.email': 'test-apply-deny@test.com',
						'contact.password': 'Pa$$w0rd',
						'contact.givenName': 'test-apply-given',
						'contact.surname': 'test-apply-sur',
						'contact.title': 'test-apply-title',
						'contact.phone': '410-349-6457',
						'contact.im.screenName': 'test-apply-screen-name',
						'contact.im.service': 'aim',
						'contact.address.address': 'test-apply-address',
						'contact.address.suite': 'test-apply-suite',
						'contact.address.city': 'test-apply-city',
						'contact.address.state': 'test-apply-state',
						'contact.address.postalCode': '12345',
						'contact.address.country': 'test-apply-country',
						'contact.timezone': 'America/Los_Angeles',
						'company.company': 'test-apply-company',
						'company.taxId': 'test-apply-tax-id',
						'company.taxClass': 'llc',
						'company.payableTo': 'contact',
						'company.payBy': 'check',
						'company.address.address': 'test-apply-company-address',
						'company.address.suite': 'test-apply-company-suite',
						'company.address.city': 'test-apply-company-city',
						'company.address.state': 'test-apply-company-state',
						'company.address.postalCode': '67890',
						'company.address.country': 'test-apply-company-country',
						'marketing.url': 'http://test',
						'marketing.siteCategory': 'test-apply-marketing-category',
						'marketing.anticipatedDailyVolume': 12345,
						'marketing.trafficSources': 'test-apply-traffic-sources',
						'marketing.comments': 'test-apply-marketing-comments',
						'marketing.howMarketed': 'test-apply-merketing-how'
					})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id']);
						result.body.application.status.should.be.equal('SUBMITTED');
						result.body.application.contact.timezone.should.be.equal('America/Los_Angeles');

						applicationIdDeny = result.body.application.id;
						denyApplicationOrganizationId = result.body.application.organization.href;
						denyAccountId = result.body.application.account.href;

						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return token for account', (done) => {
				securityApi.passwordToken({
						username: 'test-apply-deny@test.com',
						password: 'Pa$$w0rd'
					})
					.then((result) => {
						denyUserToken = result.body.accessToken;
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

		describe('resubmit application', () => {

			it('should resubmit an application', (done) => {
				affiliateApi.setToken(denyUserToken);
				affiliateApi.applicationResubmit({
						'contact.givenName': 'test-apply-given-r',
						'contact.surname': 'test-apply-sur-r',
						'contact.title': 'test-apply-title-r',
						'contact.phone': '410-349-9999',
						'contact.im.screenName': 'test-apply-screen-name-r',
						'contact.im.service': 'aim',
						'contact.address.address': 'test-apply-address-r',
						'contact.address.suite': 'test-apply-suite-r',
						'contact.address.city': 'test-apply-city-r',
						'contact.address.state': 'test-apply-state-r',
						'contact.address.postalCode': '12345',
						'contact.address.country': 'test-apply-country-r',
						'contact.timezone': 'America/Los_Angeles',
						'company.company': 'test-apply-company-r',
						'company.taxId': 'test-apply-tax-id-r',
						'company.taxClass': 'llc',
						'company.payableTo': 'contact',
						'company.payBy': 'check',
						'company.address.address': 'test-apply-company-address-r',
						'company.address.suite': 'test-apply-company-suite-r',
						'company.address.city': 'test-apply-company-city-r',
						'company.address.state': 'test-apply-company-state-r',
						'company.address.postalCode': '67890',
						'company.address.country': 'test-apply-company-country-r',
						'marketing.url': 'http://test-r',
						'marketing.siteCategory': 'test-apply-marketing-category-r',
						'marketing.anticipatedDailyVolume': 12345,
						'marketing.trafficSources': 'test-apply-traffic-sources-r',
						'marketing.comments': 'test-apply-marketing-comments-r',
						'marketing.howMarketed': 'test-apply-merketing-how-r'
					})
					.then((result) => {
						should.exist(result.body.application);
						result.body.application.should.have.properties(['id']);
						result.body.application.status.should.be.equal('SUBMITTED');
						result.body.application.contact.timezone.should.be.equal('America/Los_Angeles');

						applicationIdResubmit = result.body.application.id;

						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should return account with custom data', (done) => {
				securityApi.setToken(denyUserToken);
				securityApi.getAccount()
					.then((result) => {
						result.body.account.customData.title.should.be.equal('test-apply-title-r');
						result.body.account.givenName.should.be.equal('test-apply-given-r');
						result.body.account.surname.should.be.equal('test-apply-sur-r');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

			it('should retrieve the old application as denied', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.application({id: applicationIdDeny})
					.then((result) => {
						should.exist(result);
						should.exist(result.body);
						result.body.should.have.properties(['application']);
						result.body.application.should.have.properties(['id']);
						result.body.application.id.should.be.equal(applicationIdDeny);
						result.body.application.status.should.be.equal('DENIED');
						done();
					})
					.fail((err) => {
						done(err);
					});
			});

		});

		describe('cleanup', () => {

			it('should delete the denied application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
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

			it('should delete the resubmitted application', (done) => {
				affiliateApi.setToken(adminPasswordToken);
				affiliateApi.applicationDelete({id: applicationIdResubmit})
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