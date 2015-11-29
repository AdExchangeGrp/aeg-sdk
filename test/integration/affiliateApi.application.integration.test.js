'use strict';

import affiliateApi from '../../src/api/affiliateApi';
import securityApi from '../../src/api/securityApi';
//import _ from 'underscore';

/** @namespace result.body.should.have */
describe('affiliateApi - Application', () => {

	let adminPasswordToken;
	let adminRefreshToken;

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

			affiliateApi.apply({
					contactEmail: 'test-apply@test.com',
					contactPassword: 'Pa$$w0rd',
					contactGivenName: 'test-apply-given',
					contactSurname: 'test-apply-sur',
					contactTitle: 'test-apply-title',
					contactPhone: '123-123-1234',
					contactImScreenName: 'test-apply-screen-name',
					contactImScreenService: 'test-apply-im-service',
					contactAddress: 'test-apply-address',
					contactSuite: 'test-apply-suite',
					contactCity: 'test-apply-city',
					contactState: 'test-apply-state',
					contactPostalCode: 'test-apply-postal',
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
					companyPostalCode: 'test-apply-company-postal',
					companyCountry: 'test-apply-company-country',
					marketingUrl: 'http://test',
					marketingSiteCategory: 'test-apply-marketing-category',
					marketingAnticipatedDailyVolume: 12345,
					marketingTrafficSources: 'test-apply-traffic-sources',
					marketingComments: 'test-apply-marketing-comments',
					marketingHowMarketed: 'test-apply-merketing-how'
				})
				.then((result) => {
					result.body.should.be.eql({message: 'success'});
					done();
				})
				.fail((err) => {
					done(err);
				});

		});

	});

	describe('#teardown', () => {

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