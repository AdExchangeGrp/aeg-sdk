'use strict';

import affiliateApi from '../../../src/api/affiliate-api';
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

	describe('#reportsTopEpcAffiliate', () => {

		it('should return performance report daily', (done) => {
			testTopEpcAffiliateReport({interval: 'daily', limit: 5}, done);
		});

		it('should return performance report weekly', (done) => {
			testTopEpcAffiliateReport({interval: 'weekly'}, done);
		});

		it('should return performance report monthly', (done) => {
			testTopEpcAffiliateReport({interval: 'monthly', filter: 'desktop'}, done);
		});

		it('should return performance report yearly', (done) => {
			testTopEpcAffiliateReport({interval: 'yearly', timezone: 'America/Los_Angeles'}, done);
		});

		it('should return performance report yearly for account 170001', (done) => {
			testTopEpcAffiliateReport({
				interval: 'yearly',
				timezone: 'America/Los_Angeles',
				token: passwordToken170001
			}, done);
		});

		it('should not return performance report yearly for account 170001', (done) => {
			testTopEpcAffiliateReport({
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

	describe('#reportsTopEpcNetwork', () => {

		it('should return performance report daily', (done) => {
			testTopEpcNetworkReport({interval: 'daily', limit: 5}, done);
		});

		it('should return performance report weekly', (done) => {
			testTopEpcNetworkReport({interval: 'weekly'}, done);
		});

		it('should return performance report monthly', (done) => {
			testTopEpcNetworkReport({interval: 'monthly', filter: 'mobile'}, done);
		});

		it('should return performance report yearly', (done) => {
			testTopEpcNetworkReport({interval: 'yearly', timezone: 'America/Los_Angeles'}, done);
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

		if (options.limit) {
			args.limit = options.limit;
		}

		affiliateApi.reportsPerformance(args)
			.then((result) => {
				validatePerformanceReport(result, args.sort, args.sortDirection, args.limit);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validatePerformanceReport(result, sort, sortDirection, limit) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		result.body.data.should.have.properties(['revenue', 'epc', 'sales', 'clicks', 'cr', 'subIds']);
		_.isArray(result.body.data.subIds).should.be.ok;

		var lastVal;

		if (limit) {
			(result.body.data.subIds.length <= limit).should.be.ok;
		}

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

	function testTopEpcAffiliateReport(options, callback) {

		let args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			filter: options.filter ? options.filter : 'all'
		};

		if (options.limit) {
			args.limit = options.limit;
		}

		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);
		affiliateApi.reportsTopEpcAffiliate(args)
			.then((result) => {
				validateTopEpcReport(result, args.limit);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function testTopEpcNetworkReport(options, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi.reportsTopEpcNetwork({
				interval: options.interval ? options.interval : 'daily',
				filter: options.filter ? options.filter : 'all'
			})
			.then((result) => {
				validateTopEpcReport(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validateTopEpcReport(result, limit) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		_.isArray(result.body.data).should.be.ok;
		if (limit) {
			(result.body.data.length <= limit).should.be.ok;
		}
		_.each(result.body.data, (offer) => {
			offer.should.have.properties(['id', 'epc', 'vertical']);
		});
	}

});