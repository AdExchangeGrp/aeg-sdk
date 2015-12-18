'use strict';

import affiliateApi from '../../../src/api/affiliateApi';
import securityApi from '../../../src/api/securityApi';
import should from 'should';
import _ from 'lodash';

/** @namespace result.body.should.have */
describe('affiliateApi - Reports', () => {

	let adminPasswordToken;
	let adminRefreshToken;
	let passwordToken170001;
	let refreshToken170001;

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

		it('should return password token for affiliate 170001 without error', (done) => {
			securityApi.passwordToken({
					username: 'test-affiliate-170001@test.com',
					password: 'Pa$$w0rd',
					fetchAccount: false,
					searchTerm: 'href',
					searchValue: 'https://api.stormpath.com/v1/organizations/WEtXUXdI444q8jNq7NGAE'
				})
				.then((result) => {
					result.body.should.have.properties(['accessToken', 'refreshToken']);
					result.body.should.not.have.properties(['account']);

					passwordToken170001 = result.body.accessToken;
					refreshToken170001 = result.body.refreshToken;

					done();
				})
				.fail((err) => {
					done(err);
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

		it('should revoke the password access token for the affiliate scope', (done) => {
			securityApi.setToken(passwordToken170001);
			securityApi.revokePasswordToken({refreshToken: refreshToken170001})
				.then((result) => {
					result.body.message.should.be.equal('success');
					done();
				})
				.fail((err) => {
					done(err);
				});
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
		affiliateApi.setToken(options.token? options.token : adminPasswordToken);
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