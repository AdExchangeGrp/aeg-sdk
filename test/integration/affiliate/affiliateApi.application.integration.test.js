'use strict';

import affiliateApi from '../../../src/api/affiliateApi';
import securityApi from '../../../src/api/securityApi';
import should from 'should';

/** @namespace result.body.should.have */
describe('affiliateApi - Application', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let applicationId;

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

	describe('#apply()', () => {

		it('should create an application', (done) => {

			affiliateApi.applicationApply({
					contactEmail: 'test-apply@test.com',
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
					result.body.application.should.have.properties(['href']);
					result.body.application.href.should.be.a.String;
					result.body.application.href.length.should.be.greaterThan(0);

					applicationId = result.body.application.id;

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
			affiliateApi.applicationApprove({id: applicationId, affiliateName: 'Test Approved Affiliate'})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

	});

	describe('#teardown', () => {

		let newUserToken;

		it('should return token for new account', (done) => {
			securityApi.passwordToken({username: 'test-apply@test.com', password: 'Pa$$w0rd'})
				.then((result) => {
					newUserToken = result.body.accessToken;
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should revoke user', (done) => {
			securityApi.setToken(newUserToken);
			securityApi.revokeAccount()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should revoke the refresh token for the admin', (done) => {
			securityApi.setToken(adminRefreshToken);
			securityApi.revokePasswordToken()
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
		});

		it('should revoke the password access token for the admin', (done) => {
			securityApi.setToken(adminPasswordToken);
			securityApi.revokePasswordToken()
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