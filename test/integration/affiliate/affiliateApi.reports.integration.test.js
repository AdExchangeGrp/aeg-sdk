'use strict';

import affiliateApi from '../../../src/api/affiliateApi';
import securityApi from '../../../src/api/securityApi';
import should from 'should';
import _ from 'underscore';

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

	describe('#reportsPerformance', () => {

		it('should return performance report daily', (done) => {
			testPerformaceReport('daily', done);
		});

		it('should return performance report weekly', (done) => {
			testPerformaceReport('weekly', done);
		});

		it('should return performance report monthly', (done) => {
			testPerformaceReport('monthly', done);
		});

		it('should return performance report yearly', (done) => {
			testPerformaceReport('yearly', done);
		});

	});

	describe('#reportsTop10EpcAffiliate', () => {

		it('should return performance report daily', (done) => {
			testTop10EpcAffiliateReport('daily', done);
		});

		it('should return performance report weekly', (done) => {
			testTop10EpcAffiliateReport('weekly', done);
		});

		it('should return performance report monthly', (done) => {
			testTop10EpcAffiliateReport('monthly', done);
		});

		it('should return performance report yearly', (done) => {
			testTop10EpcAffiliateReport('yearly', done);
		});

	});

	describe('#reportsTop10EpcNetwork', () => {

		it('should return performance report daily', (done) => {
			testTop10EpcNetworkReport('daily', done);
		});

		it('should return performance report weekly', (done) => {
			testTop10EpcNetworkReport('weekly', done);
		});

		it('should return performance report monthly', (done) => {
			testTop10EpcNetworkReport('monthly', done);
		});

		it('should return performance report yearly', (done) => {
			testTop10EpcNetworkReport('yearly', done);
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

	function testPerformaceReport(interval, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi.reportsPerformance({
				affiliateId: 170001,
				interval: interval,
				sort: 'clicks',
				sortDirection: 'asc'
			})
			.then((result) => {
				validatePerformanceReport(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validatePerformanceReport(result) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		result.body.data.should.have.properties(['revenue', 'epc', 'sales', 'clicks', 'cr', 'subIds']);
		_.isArray(result.body.data.subIds).should.be.ok;
		_.each(result.body.data.subIds, (sub) => {
			sub.should.have.properties(['id', 'clicks', 'sales', 'cr']);
		});
	}

	function testTop10EpcAffiliateReport(interval, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi.reportsTop10EpcAffiliate({
				affiliateId: 170001,
				interval: interval,
				filter: 'all'
			})
			.then((result) => {
				validateTop10EpcReport(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function testTop10EpcNetworkReport(interval, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi.reportsTop10EpcNetwork({
				interval: interval,
				filter: 'all'
			})
			.then((result) => {
				validateTop10EpcReport(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validateTop10EpcReport(result) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		_.isArray(result.body.data).should.be.ok;
		_.each(result.body.data, (offer) => {
			offer.should.have.properties(['id', 'epc', 'vertical']);
		});
	}

});