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

	describe('#reportsPoints', () => {

		it('should return points report', (done) => {
			testPointsReport({}, done);
		});

	});

	describe('#hp reports', () => {

		describe('#reportsPerformance', () => {

			it('should return performance report daily', (done) => {
				testPerformanceReport({interval: 'daily', sort: 'clicks'}, 'reportsPerformanceHP', done);
			});

			it('should return performance report weekly', (done) => {
				testPerformanceReport({interval: 'weekly', sort: 'sales'}, 'reportsPerformanceHP', done);
			});

			it('should return performance report monthly', (done) => {
				testPerformanceReport({interval: 'monthly', sort: 'cr'}, 'reportsPerformanceHP', done);
			});

			it('should return performance report yearly', (done) => {
				testPerformanceReport({
					interval: 'yearly',
					sort: 'cr',
					sortDirection: 'desc'
				}, 'reportsPerformanceHP', done);
			});

			it('should return performance report daily with timezone', (done) => {
				testPerformanceReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsPerformanceHP', done);
			});

			it('should return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles',
					token: passwordToken170001
				}, 'reportsPerformanceHP', done);
			});

			it('should not return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceReport({
						affiliateId: 170002,
						interval: 'yearly',
						timezone: 'America/Los_Angeles',
						token: passwordToken170001
					},
					'reportsPerformanceHP',
					(err) => {
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
				testTopEpcAffiliateReport({interval: 'daily', limit: 5}, 'reportsTopEpcAffiliateHP', done);
			});

			it('should return performance report weekly', (done) => {
				testTopEpcAffiliateReport({interval: 'weekly'}, 'reportsTopEpcAffiliateHP', done);
			});

			it('should return performance report monthly', (done) => {
				testTopEpcAffiliateReport({interval: 'monthly', device: 'desktop'}, 'reportsTopEpcAffiliateHP', done);
			});

			it('should return performance report yearly', (done) => {
				testTopEpcAffiliateReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsTopEpcAffiliateHP', done);
			});

			it('should return performance report yearly for account 170001', (done) => {
				testTopEpcAffiliateReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles',
					token: passwordToken170001
				}, 'reportsTopEpcAffiliateHP', done);
			});

			it('should not return performance report yearly for account 170001', (done) => {
				testTopEpcAffiliateReport({
						affiliateId: 170002,
						interval: 'yearly',
						timezone: 'America/Los_Angeles',
						token: passwordToken170001
					},
					'reportsTopEpcAffiliateHP',
					(err) => {
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
				testTopEpcNetworkReport({interval: 'daily', limit: 5}, 'reportsTopEpcNetworkHP', done);
			});

			it('should return performance report weekly', (done) => {
				testTopEpcNetworkReport({interval: 'weekly'}, 'reportsTopEpcNetworkHP', done);
			});

			it('should return performance report monthly', (done) => {
				testTopEpcNetworkReport({interval: 'monthly', device: 'mobile'}, 'reportsTopEpcNetworkHP', done);
			});

			it('should return performance report yearly', (done) => {
				testTopEpcNetworkReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsTopEpcNetworkHP', done);
			});

		});

	});

	describe('#aeg reports', () => {

		describe('#reportsPerformance', () => {

			it('should return performance report daily', (done) => {
				testPerformanceReportAEG({interval: 'daily'}, 'reportsPerformanceAEG', done);
			});

			it('should return performance report weekly', (done) => {
				testPerformanceReportAEG({interval: 'weekly'}, 'reportsPerformanceAEG', done);
			});

			it('should return performance report monthly', (done) => {
				testPerformanceReportAEG({interval: 'monthly'}, 'reportsPerformanceAEG', done);
			});

			it('should return performance report yearly', (done) => {
				testPerformanceReportAEG({
					interval: 'yearly'
				}, 'reportsPerformanceAEG', done);
			});

			it('should return performance report daily with timezone', (done) => {
				testPerformanceReportAEG({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsPerformanceAEG', done);
			});

			it('should return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceReportAEG({
					interval: 'yearly',
					timezone: 'America/Los_Angeles',
					token: passwordToken170001
				}, 'reportsPerformanceAEG', done);
			});

			it('should not return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceReportAEG({
						affiliateId: 170002,
						interval: 'yearly',
						timezone: 'America/Los_Angeles',
						token: passwordToken170001
					},
					'reportsPerformanceAEG',
					(err) => {
						if (err) {
							done();
						} else {
							done(new Error('Should not have returned report'));
						}
					});
			});

		});

		describe('#reportsPerformanceSubIds', () => {

			it('should return performance report daily', (done) => {
				testPerformanceSubIdReportAEG({interval: 'daily', sort: 'clicks'}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should return performance report weekly', (done) => {
				testPerformanceSubIdReportAEG({interval: 'weekly', sort: 'sales'}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should return performance report monthly', (done) => {
				testPerformanceSubIdReportAEG({interval: 'monthly', sort: 'cr'}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should return performance report yearly', (done) => {
				testPerformanceSubIdReportAEG({
					interval: 'yearly',
					sort: 'cr',
					sortDirection: 'desc'
				}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should return performance report daily with timezone', (done) => {
				testPerformanceSubIdReportAEG({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceSubIdReportAEG({
					interval: 'yearly',
					timezone: 'America/Los_Angeles',
					token: passwordToken170001
				}, 'reportsPerformanceSubIdsAEG', done);
			});

			it('should not return performance report yearly with timezone for account 170001', (done) => {
				testPerformanceSubIdReportAEG({
						affiliateId: 170002,
						interval: 'yearly',
						timezone: 'America/Los_Angeles',
						token: passwordToken170001
					},
					'reportsPerformanceSubIdsAEG',
					(err) => {
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
				testTopEpcAffiliateReport({interval: 'daily', limit: 5}, 'reportsTopEpcAffiliateAEG', done);
			});

			it('should return performance report weekly', (done) => {
				testTopEpcAffiliateReport({interval: 'weekly'}, 'reportsTopEpcAffiliateAEG', done);
			});

			it('should return performance report monthly', (done) => {
				testTopEpcAffiliateReport({interval: 'monthly', device: 'desktop'}, 'reportsTopEpcAffiliateAEG', done);
			});

			it('should return performance report yearly', (done) => {
				testTopEpcAffiliateReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsTopEpcAffiliateAEG', done);
			});

			it('should return performance report yearly for account 170001', (done) => {
				testTopEpcAffiliateReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles',
					token: passwordToken170001
				}, 'reportsTopEpcAffiliateAEG', done);
			});

			it('should not return performance report yearly for account 170001', (done) => {
				testTopEpcAffiliateReport({
						affiliateId: 170002,
						interval: 'yearly',
						timezone: 'America/Los_Angeles',
						token: passwordToken170001
					},
					'reportsTopEpcAffiliateAEG',
					(err) => {
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
				testTopEpcNetworkReport({interval: 'daily', limit: 5}, 'reportsTopEpcNetworkAEG', done);
			});

			it('should return performance report weekly', (done) => {
				testTopEpcNetworkReport({interval: 'weekly'}, 'reportsTopEpcNetworkAEG', done);
			});

			it('should return performance report monthly', (done) => {
				testTopEpcNetworkReport({interval: 'monthly', device: 'mobile'}, 'reportsTopEpcNetworkAEG', done);
			});

			it('should return performance report yearly', (done) => {
				testTopEpcNetworkReport({
					interval: 'yearly',
					timezone: 'America/Los_Angeles'
				}, 'reportsTopEpcNetworkAEG', done);
			});

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

	function testPointsReport(options, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);

		var args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001
		};

		if (options.timezone) {
			args.timezone = options.timezone;
		}

		affiliateApi.reportsPoints(args)
			.then((result) => {
				should.exist(result);
				should.exist(result.body);
				should.exist(result.body.data);
				result.body.data.should.have.properties('points');
				result.body.data.points.should.be.a.Number;
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function testPerformanceReportAEG(options, func, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);

		var args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			vertical: options.vertical ? options.vertical : 'all',
			device: 'all'
		};

		if (options.timezone) {
			args.timezone = options.timezone;
		}

		affiliateApi[func](args)
			.then((result) => {
				validatePerformanceReportAEG(result);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validatePerformanceReportAEG(result) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		result.body.data.should.have.properties(['revenue', 'epc', 'sales', 'clicks', 'cr']);
	}

	function testPerformanceReport(options, func, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);

		var args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			vertical: options.vertical ? options.vertical : 'all',
			sort: options.sort ? options.sort : 'clicks',
			sortDirection: options.sortDirection ? options.sortDirection : 'asc',
			device: 'all'
		};

		if (options.timezone) {
			args.timezone = options.timezone;
		}

		if (options.limit) {
			args.limit = options.limit;
		}

		affiliateApi[func](args)
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

	function testPerformanceSubIdReportAEG(options, func, callback) {
		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);

		var args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			vertical: options.vertical ? options.vertical : 'all',
			sort: options.sort ? options.sort : 'clicks',
			sortDirection: options.sortDirection ? options.sortDirection : 'asc',
			device: 'all'
		};

		if (options.timezone) {
			args.timezone = options.timezone;
		}

		if (options.limit) {
			args.limit = options.limit;
		}

		affiliateApi[func](args)
			.then((result) => {
				validatePerformanceSubIdReportAEG(result, args.sort, args.sortDirection, args.limit);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function validatePerformanceSubIdReportAEG(result, sort, sortDirection, limit) {
		should.exist(result);
		should.exist(result.body);
		should.exist(result.body.data);
		result.body.data.should.have.properties(['subIds']);
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

	function testTopEpcAffiliateReport(options, func, callback) {

		let args = {
			affiliateId: options.affiliateId ? options.affiliateId : 170001,
			interval: options.interval ? options.interval : 'daily',
			device: options.device ? options.device : 'all',
			vertical: options.vertical ? options.vertical: 'all'
		};

		if (options.limit) {
			args.limit = options.limit;
		}

		affiliateApi.setToken(options.token ? options.token : adminPasswordToken);
		affiliateApi[func](args)
			.then((result) => {
				validateTopEpcReport(result, args.limit);
				callback();
			})
			.fail((err) => {
				callback(err);
			});
	}

	function testTopEpcNetworkReport(options, func, callback) {
		affiliateApi.setToken(adminPasswordToken);
		affiliateApi[func]({
			interval: options.interval ? options.interval : 'daily',
			device: options.device ? options.device : 'all',
			vertical: options.vertical ? options.vertical: 'all'
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