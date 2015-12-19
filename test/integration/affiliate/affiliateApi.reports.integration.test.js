'use strict';

import affiliateApi from '../../../src/api/affiliateApi';
import should from 'should';
import _ from 'lodash';
import setup from '../setup';

/** @namespace result.body.should.have */
describe('affiliateApi - Reports', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let passwordToken170001;
	let refreshToken170001;

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

		it('should setup', (done) => {

			setup.getPasswordToken('test-affiliate-170001@test.com', 'Pa$$w0rd', {
				fetchAccount: false,
				searchTerm: 'href',
				searchValue: 'https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE'
			}, (err, result) => {
				if (err) {
					done(err);
				} else {
					passwordToken170001 = result.accessToken;
					refreshToken170001 = result.refreshToken;
					done();
				}
			});

		});

	});

	describe('#reportsPerformance', () => {

		it('should return performance report daily', (done) => {
			testPerformaceReport({interval: 'daily', sort: 'clicks'}, done);
		});

		it('should return performance report weekly', (done) => {
			testPerformaceReport({interval: 'weekly', sort: 'sales'}, done);
		});

		it('should return performance report monthly', (done) => {
			testPerformaceReport({interval: 'monthly', sort: 'cr'}, done);
		});

		it('should return performance report yearly', (done) => {
			testPerformaceReport({interval: 'yearly', sort: 'cr', sortDirection: 'desc'}, done);
		});

		it('should return performance report daily with timezone', (done) => {
			testPerformaceReport({interval: 'yearly', timezone: 'America/Los_Angeles'}, done);
		});

		it('should return performance report yearly with timezone for account 170001', (done) => {
			testPerformaceReport({
				interval: 'yearly',
				timezone: 'America/Los_Angeles',
				token: passwordToken170001
			}, done);
		});

		it('should not return performance report yearly with timezone for account 170001', (done) => {
			testPerformaceReport({
				affiliateId: 170002,
				interval: 'yearly',
				timezone: 'America/Los_Angeles',
				token: passwordToken170001
			}, (err) => {
				if (err) {
					done();
				} else {
					done(new Error('Should not have returned report'));
				}
			});
		});

	});

	describe('#reportsTop10EpcAffiliate', () => {

		it('should return performance report daily', (done) => {
			testTop10EpcAffiliateReport({interval: 'daily'}, done);
		});

		it('should return performance report weekly', (done) => {
			testTop10EpcAffiliateReport({interval: 'weekly'}, done);
		});

		it('should return performance report monthly', (done) => {
			testTop10EpcAffiliateReport({interval: 'monthly', filter: 'desktop'}, done);
		});

		it('should return performance report yearly', (done) => {
			testTop10EpcAffiliateReport({interval: 'yearly', timezone: 'America/Los_Angeles'}, done);
		});

		it('should return performance report yearly for account 170001', (done) => {
			testTop10EpcAffiliateReport({
				interval: 'yearly',
				timezone: 'America/Los_Angeles',
				token: passwordToken170001
			}, done);
		});

		it('should not return performance report yearly for account 170001', (done) => {
			testTop10EpcAffiliateReport({
				affiliateId: 170002,
				interval: 'yearly',
				timezone: 'America/Los_Angeles',
				token: passwordToken170001
			}, (err) => {
				if (err) {
					done();
				} else {
					done(new Error('Should not have returned report'));
				}
			});
		});

	});

	describe('#reportsTop10EpcNetwork', () => {

		it('should return performance report daily', (done) => {
			testTop10EpcNetworkReport({interval: 'daily'}, done);
		});

		it('should return performance report weekly', (done) => {
			testTop10EpcNetworkReport({interval: 'weekly'}, done);
		});

		it('should return performance report monthly', (done) => {
			testTop10EpcNetworkReport({interval: 'monthly', filter: 'mobile'}, done);
		});

		it('should return performance report yearly', (done) => {
			testTop10EpcNetworkReport({interval: 'yearly', timezone: 'America/Los_Angeles'}, done);
		});

	});

	describe('teardown', () => {

		it('should teardown', (done) => {

			setup.revokePasswordToken(adminPasswordToken, adminRefreshToken, done);

		});

		it('should teardown', (done) => {

			setup.revokePasswordToken(passwordToken170001, refreshToken170001, done);

		});

	});

	function testPerformaceReport(options, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);

		var args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			sort: options.sort ? options.sort : 'clicks',
			sortDirection: options.sortDirection ? options.sortDirection : 'asc'
		};

		if (options.timezone) {
			args.timezone = options.timezone;
		}

		affiliateApi.reportsPerformance(args)
			.then((result) => {
				validatePerformanceReport(result, args.sort, args.sortDirection);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validatePerformanceReport(result, sort, sortDirection) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		result.body.data.should.have.properties(['revenue', 'epc', 'sales', 'clicks', 'cr', 'subIds']);
		_.isArray(result.body.data.subIds).should.be.ok;

		var lastVal;

		_.each(result.body.data.subIds, (sub, i) => {

			sub.should.have.properties(['id', 'clicks', 'sales', 'cr']);

			switch (sort) {
				case 'sales':
					if (i === 0) {
						lastVal = sub.sales;
					}
					if (sortDirection === 'asc') {
						(sub.sales >= lastVal).should.be.ok;
					} else {
						(sub.sales <= lastVal).should.be.ok;
					}
					lastVal = sub.sales;
					break;
				case 'clicks':
					if (i === 0) {
						lastVal = sub.clicks;
					}
					if (sortDirection === 'asc') {
						(sub.clicks >= lastVal).should.be.ok;
					} else {
						(sub.clicks <= lastVal).should.be.ok;
					}
					lastVal = sub.clicks;
					break;
				case 'cr':
					if (i === 0) {
						lastVal = sub.cr;
					}
					if (sortDirection === 'asc') {
						(sub.cr >= lastVal).should.be.ok;
					} else {
						(sub.cr <= lastVal).should.be.ok;
					}
					lastVal = sub.cr;
					break;
			}
		});
	}

	function testTop10EpcAffiliateReport(options, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);
		affiliateApi.reportsTop10EpcAffiliate({
				affiliateId: options.affiliateId ? options.affiliateId : 170001,
				interval: options.interval ? options.interval : 'daily',
				filter: options.filter ? options.filter : 'all'
			})
			.then((result) => {
				validateTop10EpcReport(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function testTop10EpcNetworkReport(options, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi.reportsTop10EpcNetwork({
				interval: options.interval ? options.interval : 'daily',
				filter: options.filter ? options.filter : 'all'
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