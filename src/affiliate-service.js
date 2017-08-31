/*jshint -W069 */
/* AUTO GENERATED DO NOT EDIT */
/**
 * Affiliate operations for Camp 2.0 (All reports in EST/EDT America/New_York)
 * @class AffiliateService
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AffiliateService = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');
    var config = require('config');
    var _ = require('lodash');

    function AffiliateService(options) {

        var identifier = _.camelCase('AffiliateService');

        if (config.has('aeg-sdk') && config.get('aeg-sdk')[identifier]) {

            this.domain = config.get('aeg-sdk')[identifier].host;

        } else {

            throw new Error('Domain parameter must be specified as a string.');

        }

        request = (typeof options === 'object') ? (options.request ? options.request : request) : request;

        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    /**
     * Set Token
     * @method
     * @name AffiliateService#setToken
     * @param {string} value - token's value
     * @param {string} [prefix] - the token header prefix (Basic, Bearer)
     *
     */
    AffiliateService.prototype.setToken = function(value, prefix) {
        this.token.value = value;
        this.token.headerOrQueryName = null;
        this.token.isQuery = false;
        this.token.prefix = prefix;
    };

    /**
     * Changes the logging level of the service.
     * @method
     * @name AffiliateService#logLevel
     * @param {string} level - Log level
     * 
     */
    AffiliateService.prototype.logLevel = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/control/logLevel';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters['level'] !== undefined) {
            form['level'] = parameters['level'];
        }

        if (parameters['level'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: level'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Flushes the affiliate cache.
     * @method
     * @name AffiliateService#controlCacheFlushAffiliates
     * 
     */
    AffiliateService.prototype.controlCacheFlushAffiliates = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/control/cache/affiliate/flush';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Flushes the affiliate point cache.
     * @method
     * @name AffiliateService#controlFlushPoints
     * 
     */
    AffiliateService.prototype.controlFlushPoints = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/control/cache/points/flush';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Flushes the promo cache
     * @method
     * @name AffiliateService#controlFlushPromotions
     * 
     */
    AffiliateService.prototype.controlFlushPromotions = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/control/cache/promotions/flush';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Sends a notification to ask for more cap
     * @method
     * @name AffiliateService#requestCap
     * @param {string} affiliateId - Affiliate id
     * @param {string} offerPair - The offer pair id in the form of X:X
     * 
     */
    AffiliateService.prototype.requestCap = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/cap/request';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['offerPair'] !== undefined) {
            form['offerPair'] = parameters['offerPair'];
        }

        if (parameters['offerPair'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerPair'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * neutral an offer
     * @method
     * @name AffiliateService#setFunnelOfferNeutral
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.setFunnelOfferNeutral = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/neutral';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        path = path.replace('{offerId}', parameters['offerId']);

        if (parameters['offerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerId'));
            return deferred.promise;
        }

        path = path.replace('{funnelId}', parameters['funnelId']);

        if (parameters['funnelId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: funnelId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * dislike an offer
     * @method
     * @name AffiliateService#dislikeFunnelOffer
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.dislikeFunnelOffer = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/dislike';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        path = path.replace('{offerId}', parameters['offerId']);

        if (parameters['offerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerId'));
            return deferred.promise;
        }

        path = path.replace('{funnelId}', parameters['funnelId']);

        if (parameters['funnelId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: funnelId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * like an offer
     * @method
     * @name AffiliateService#likeFunnelOffer
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.likeFunnelOffer = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/like';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        path = path.replace('{offerId}', parameters['offerId']);

        if (parameters['offerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerId'));
            return deferred.promise;
        }

        path = path.replace('{funnelId}', parameters['funnelId']);

        if (parameters['funnelId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: funnelId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * skips an offer
     * @method
     * @name AffiliateService#skipFunnelOffer
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair ID in X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.skipFunnelOffer = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/funnel/{funnelId}/offer/{offerId}/skip';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        path = path.replace('{offerId}', parameters['offerId']);

        if (parameters['offerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerId'));
            return deferred.promise;
        }

        path = path.replace('{funnelId}', parameters['funnelId']);

        if (parameters['funnelId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: funnelId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Returns an affiliates' funnels
     * @method
     * @name AffiliateService#funnels
     * @param {string} affiliateId - The affiliate id
     * 
     */
    AffiliateService.prototype.funnels = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/funnels';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Returns an affiliate promotion state
     * @method
     * @name AffiliateService#promotion
     * @param {string} affiliateId - The affiliate id
     * @param {string} promotionId - The promotion id
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.promotion = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/promotion/{promotionId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        path = path.replace('{promotionId}', parameters['promotionId']);

        if (parameters['promotionId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: promotionId'));
            return deferred.promise;
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Returns applications.
     * @method
     * @name AffiliateService#applications
     * @param {string} account - Account href
     * 
     */
    AffiliateService.prototype.applications = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/applications';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters['account'] !== undefined) {
            queryParameters['account'] = parameters['account'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get an application.
     * @method
     * @name AffiliateService#application
     * @param {string} id - Application id
     * 
     */
    AffiliateService.prototype.application = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/{id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Delete an affiliate application
     * @method
     * @name AffiliateService#applicationDelete
     * @param {string} id - Application id
     * 
     */
    AffiliateService.prototype.applicationDelete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/{id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Apply to be an affiliate.
     * @method
     * @name AffiliateService#applicationApply
     * @param {string} contact.email - Contact email address and primary user name
     * @param {string} contact.password - Contact account password
     * @param {string} contact.givenName - Contact given name
     * @param {string} contact.surname - Contact surname
     * @param {string} contact.title - Contact title
     * @param {string} contact.phone - Contact phone +12345677890
     * @param {string} contact.im.screenName - Contact instant messinger screen name
     * @param {string} contact.im.service - Contact instant messinger service type
     * @param {string} contact.timezone - Preferred timezone, default's to EST
     * @param {string} contact.address.address - Contact street address
     * @param {string} contact.address.suite - Contact suite
     * @param {string} contact.address.city - Contact city
     * @param {string} contact.address.state - Contact state
     * @param {string} contact.address.postalCode - Contact postal code XXXXX or XXXXX-XXXX
     * @param {string} contact.address.country - Contact country
     * @param {string} company.company - Company name
     * @param {string} company.taxId - Company tax id
     * @param {string} company.taxClass - Company tax class
     * @param {string} company.payableTo - Company payable to
     * @param {string} company.payBy - Company pay by type
     * @param {string} company.address.address - Company address
     * @param {string} company.address.suite - Company suite
     * @param {string} company.address.city - Company city
     * @param {string} company.address.state - Company state
     * @param {string} company.address.postalCode - Company postal code XXXXX or XXXXX-XXXX
     * @param {string} company.address.country - Company country
     * @param {string} marketing.url - Marketing site url
     * @param {string} marketing.siteCategory - Marketing site category
     * @param {number} marketing.anticipatedDailyVolume - Marketing anticipated daily sales volume
     * @param {string} marketing.trafficSources - Marketing traffic sources
     * @param {string} marketing.comments - Marketing comments
     * @param {string} marketing.howMarketed - How does the affiliate market
     * 
     */
    AffiliateService.prototype.applicationApply = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['contact.email'] !== undefined) {
            form['contact.email'] = parameters['contact.email'];
        }

        if (parameters['contact.email'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.email'));
            return deferred.promise;
        }

        if (parameters['contact.password'] !== undefined) {
            form['contact.password'] = parameters['contact.password'];
        }

        if (parameters['contact.password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.password'));
            return deferred.promise;
        }

        if (parameters['contact.givenName'] !== undefined) {
            form['contact.givenName'] = parameters['contact.givenName'];
        }

        if (parameters['contact.givenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.givenName'));
            return deferred.promise;
        }

        if (parameters['contact.surname'] !== undefined) {
            form['contact.surname'] = parameters['contact.surname'];
        }

        if (parameters['contact.surname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.surname'));
            return deferred.promise;
        }

        if (parameters['contact.title'] !== undefined) {
            form['contact.title'] = parameters['contact.title'];
        }

        if (parameters['contact.phone'] !== undefined) {
            form['contact.phone'] = parameters['contact.phone'];
        }

        if (parameters['contact.phone'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.phone'));
            return deferred.promise;
        }

        if (parameters['contact.im.screenName'] !== undefined) {
            form['contact.im.screenName'] = parameters['contact.im.screenName'];
        }

        if (parameters['contact.im.service'] !== undefined) {
            form['contact.im.service'] = parameters['contact.im.service'];
        }

        if (parameters['contact.timezone'] !== undefined) {
            form['contact.timezone'] = parameters['contact.timezone'];
        }

        if (parameters['contact.address.address'] !== undefined) {
            form['contact.address.address'] = parameters['contact.address.address'];
        }

        if (parameters['contact.address.address'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.address'));
            return deferred.promise;
        }

        if (parameters['contact.address.suite'] !== undefined) {
            form['contact.address.suite'] = parameters['contact.address.suite'];
        }

        if (parameters['contact.address.city'] !== undefined) {
            form['contact.address.city'] = parameters['contact.address.city'];
        }

        if (parameters['contact.address.city'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.city'));
            return deferred.promise;
        }

        if (parameters['contact.address.state'] !== undefined) {
            form['contact.address.state'] = parameters['contact.address.state'];
        }

        if (parameters['contact.address.state'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.state'));
            return deferred.promise;
        }

        if (parameters['contact.address.postalCode'] !== undefined) {
            form['contact.address.postalCode'] = parameters['contact.address.postalCode'];
        }

        if (parameters['contact.address.postalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.postalCode'));
            return deferred.promise;
        }

        if (parameters['contact.address.country'] !== undefined) {
            form['contact.address.country'] = parameters['contact.address.country'];
        }

        if (parameters['contact.address.country'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.country'));
            return deferred.promise;
        }

        if (parameters['company.company'] !== undefined) {
            form['company.company'] = parameters['company.company'];
        }

        if (parameters['company.company'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.company'));
            return deferred.promise;
        }

        if (parameters['company.taxId'] !== undefined) {
            form['company.taxId'] = parameters['company.taxId'];
        }

        if (parameters['company.taxId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.taxId'));
            return deferred.promise;
        }

        if (parameters['company.taxClass'] !== undefined) {
            form['company.taxClass'] = parameters['company.taxClass'];
        }

        if (parameters['company.taxClass'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.taxClass'));
            return deferred.promise;
        }

        if (parameters['company.payableTo'] !== undefined) {
            form['company.payableTo'] = parameters['company.payableTo'];
        }

        if (parameters['company.payableTo'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.payableTo'));
            return deferred.promise;
        }

        if (parameters['company.payBy'] !== undefined) {
            form['company.payBy'] = parameters['company.payBy'];
        }

        if (parameters['company.payBy'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.payBy'));
            return deferred.promise;
        }

        if (parameters['company.address.address'] !== undefined) {
            form['company.address.address'] = parameters['company.address.address'];
        }

        if (parameters['company.address.address'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.address'));
            return deferred.promise;
        }

        if (parameters['company.address.suite'] !== undefined) {
            form['company.address.suite'] = parameters['company.address.suite'];
        }

        if (parameters['company.address.city'] !== undefined) {
            form['company.address.city'] = parameters['company.address.city'];
        }

        if (parameters['company.address.city'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.city'));
            return deferred.promise;
        }

        if (parameters['company.address.state'] !== undefined) {
            form['company.address.state'] = parameters['company.address.state'];
        }

        if (parameters['company.address.state'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.state'));
            return deferred.promise;
        }

        if (parameters['company.address.postalCode'] !== undefined) {
            form['company.address.postalCode'] = parameters['company.address.postalCode'];
        }

        if (parameters['company.address.postalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.postalCode'));
            return deferred.promise;
        }

        if (parameters['company.address.country'] !== undefined) {
            form['company.address.country'] = parameters['company.address.country'];
        }

        if (parameters['company.address.country'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.country'));
            return deferred.promise;
        }

        if (parameters['marketing.url'] !== undefined) {
            form['marketing.url'] = parameters['marketing.url'];
        }

        if (parameters['marketing.url'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.url'));
            return deferred.promise;
        }

        if (parameters['marketing.siteCategory'] !== undefined) {
            form['marketing.siteCategory'] = parameters['marketing.siteCategory'];
        }

        if (parameters['marketing.anticipatedDailyVolume'] !== undefined) {
            form['marketing.anticipatedDailyVolume'] = parameters['marketing.anticipatedDailyVolume'];
        }

        if (parameters['marketing.anticipatedDailyVolume'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.anticipatedDailyVolume'));
            return deferred.promise;
        }

        if (parameters['marketing.trafficSources'] !== undefined) {
            form['marketing.trafficSources'] = parameters['marketing.trafficSources'];
        }

        if (parameters['marketing.trafficSources'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.trafficSources'));
            return deferred.promise;
        }

        if (parameters['marketing.comments'] !== undefined) {
            form['marketing.comments'] = parameters['marketing.comments'];
        }

        if (parameters['marketing.howMarketed'] !== undefined) {
            form['marketing.howMarketed'] = parameters['marketing.howMarketed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Resubmit an application to be an affiliate.
     * @method
     * @name AffiliateService#applicationResubmit
     * @param {string} contact.givenName - Contact given name
     * @param {string} contact.surname - Contact surname
     * @param {string} contact.title - Contact title
     * @param {string} contact.phone - Contact phone +12345677890
     * @param {string} contact.im.screenName - Contact instant messinger screen name
     * @param {string} contact.im.service - Contact instant messinger service type
     * @param {string} contact.timezone - Preferred timezone, default's to EST
     * @param {string} contact.address.address - Contact street address
     * @param {string} contact.address.suite - Contact suite
     * @param {string} contact.address.city - Contact city
     * @param {string} contact.address.state - Contact state
     * @param {string} contact.address.postalCode - Contact postal code XXXXX or XXXXX-XXXX
     * @param {string} contact.address.country - Contact country
     * @param {string} company.company - Company name
     * @param {string} company.taxId - Company tax id
     * @param {string} company.taxClass - Company tax class
     * @param {string} company.payableTo - Company payable to
     * @param {string} company.payBy - Company pay by type
     * @param {string} company.address.address - Company address
     * @param {string} company.address.suite - Company suite
     * @param {string} company.address.city - Company city
     * @param {string} company.address.state - Company state
     * @param {string} company.address.postalCode - Company postal code XXXXX or XXXXX-XXXX
     * @param {string} company.address.country - Company country
     * @param {string} marketing.url - Marketing site url
     * @param {string} marketing.siteCategory - Marketing site category
     * @param {number} marketing.anticipatedDailyVolume - Marketing anticipated daily sales volume
     * @param {string} marketing.trafficSources - Marketing traffic sources
     * @param {string} marketing.comments - Marketing comments
     * @param {string} marketing.howMarketed - How does the affiliate market
     * 
     */
    AffiliateService.prototype.applicationResubmit = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/account/resubmit';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters['contact.givenName'] !== undefined) {
            form['contact.givenName'] = parameters['contact.givenName'];
        }

        if (parameters['contact.givenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.givenName'));
            return deferred.promise;
        }

        if (parameters['contact.surname'] !== undefined) {
            form['contact.surname'] = parameters['contact.surname'];
        }

        if (parameters['contact.surname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.surname'));
            return deferred.promise;
        }

        if (parameters['contact.title'] !== undefined) {
            form['contact.title'] = parameters['contact.title'];
        }

        if (parameters['contact.phone'] !== undefined) {
            form['contact.phone'] = parameters['contact.phone'];
        }

        if (parameters['contact.phone'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.phone'));
            return deferred.promise;
        }

        if (parameters['contact.im.screenName'] !== undefined) {
            form['contact.im.screenName'] = parameters['contact.im.screenName'];
        }

        if (parameters['contact.im.service'] !== undefined) {
            form['contact.im.service'] = parameters['contact.im.service'];
        }

        if (parameters['contact.timezone'] !== undefined) {
            form['contact.timezone'] = parameters['contact.timezone'];
        }

        if (parameters['contact.address.address'] !== undefined) {
            form['contact.address.address'] = parameters['contact.address.address'];
        }

        if (parameters['contact.address.address'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.address'));
            return deferred.promise;
        }

        if (parameters['contact.address.suite'] !== undefined) {
            form['contact.address.suite'] = parameters['contact.address.suite'];
        }

        if (parameters['contact.address.city'] !== undefined) {
            form['contact.address.city'] = parameters['contact.address.city'];
        }

        if (parameters['contact.address.city'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.city'));
            return deferred.promise;
        }

        if (parameters['contact.address.state'] !== undefined) {
            form['contact.address.state'] = parameters['contact.address.state'];
        }

        if (parameters['contact.address.state'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.state'));
            return deferred.promise;
        }

        if (parameters['contact.address.postalCode'] !== undefined) {
            form['contact.address.postalCode'] = parameters['contact.address.postalCode'];
        }

        if (parameters['contact.address.postalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.postalCode'));
            return deferred.promise;
        }

        if (parameters['contact.address.country'] !== undefined) {
            form['contact.address.country'] = parameters['contact.address.country'];
        }

        if (parameters['contact.address.country'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contact.address.country'));
            return deferred.promise;
        }

        if (parameters['company.company'] !== undefined) {
            form['company.company'] = parameters['company.company'];
        }

        if (parameters['company.company'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.company'));
            return deferred.promise;
        }

        if (parameters['company.taxId'] !== undefined) {
            form['company.taxId'] = parameters['company.taxId'];
        }

        if (parameters['company.taxId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.taxId'));
            return deferred.promise;
        }

        if (parameters['company.taxClass'] !== undefined) {
            form['company.taxClass'] = parameters['company.taxClass'];
        }

        if (parameters['company.taxClass'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.taxClass'));
            return deferred.promise;
        }

        if (parameters['company.payableTo'] !== undefined) {
            form['company.payableTo'] = parameters['company.payableTo'];
        }

        if (parameters['company.payableTo'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.payableTo'));
            return deferred.promise;
        }

        if (parameters['company.payBy'] !== undefined) {
            form['company.payBy'] = parameters['company.payBy'];
        }

        if (parameters['company.payBy'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.payBy'));
            return deferred.promise;
        }

        if (parameters['company.address.address'] !== undefined) {
            form['company.address.address'] = parameters['company.address.address'];
        }

        if (parameters['company.address.address'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.address'));
            return deferred.promise;
        }

        if (parameters['company.address.suite'] !== undefined) {
            form['company.address.suite'] = parameters['company.address.suite'];
        }

        if (parameters['company.address.city'] !== undefined) {
            form['company.address.city'] = parameters['company.address.city'];
        }

        if (parameters['company.address.city'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.city'));
            return deferred.promise;
        }

        if (parameters['company.address.state'] !== undefined) {
            form['company.address.state'] = parameters['company.address.state'];
        }

        if (parameters['company.address.state'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.state'));
            return deferred.promise;
        }

        if (parameters['company.address.postalCode'] !== undefined) {
            form['company.address.postalCode'] = parameters['company.address.postalCode'];
        }

        if (parameters['company.address.postalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.postalCode'));
            return deferred.promise;
        }

        if (parameters['company.address.country'] !== undefined) {
            form['company.address.country'] = parameters['company.address.country'];
        }

        if (parameters['company.address.country'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company.address.country'));
            return deferred.promise;
        }

        if (parameters['marketing.url'] !== undefined) {
            form['marketing.url'] = parameters['marketing.url'];
        }

        if (parameters['marketing.url'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.url'));
            return deferred.promise;
        }

        if (parameters['marketing.siteCategory'] !== undefined) {
            form['marketing.siteCategory'] = parameters['marketing.siteCategory'];
        }

        if (parameters['marketing.anticipatedDailyVolume'] !== undefined) {
            form['marketing.anticipatedDailyVolume'] = parameters['marketing.anticipatedDailyVolume'];
        }

        if (parameters['marketing.anticipatedDailyVolume'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.anticipatedDailyVolume'));
            return deferred.promise;
        }

        if (parameters['marketing.trafficSources'] !== undefined) {
            form['marketing.trafficSources'] = parameters['marketing.trafficSources'];
        }

        if (parameters['marketing.trafficSources'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketing.trafficSources'));
            return deferred.promise;
        }

        if (parameters['marketing.comments'] !== undefined) {
            form['marketing.comments'] = parameters['marketing.comments'];
        }

        if (parameters['marketing.howMarketed'] !== undefined) {
            form['marketing.howMarketed'] = parameters['marketing.howMarketed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Approve an affiliate application.
     * @method
     * @name AffiliateService#applicationApprove
     * @param {string} id - Application id
     * @param {string} affiliateId - The new affiliate id and sub-domain
     * 
     */
    AffiliateService.prototype.applicationApprove = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/{id}/approve';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['affiliateId'] !== undefined) {
            form['affiliateId'] = parameters['affiliateId'];
        }

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Deny an affiliate application.
     * @method
     * @name AffiliateService#applicationDeny
     * @param {string} id - Application id
     * @param {string} denialReason - Denial reason
     * 
     */
    AffiliateService.prototype.applicationDeny = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/{id}/deny';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['denialReason'] !== undefined) {
            form['denialReason'] = parameters['denialReason'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Validates a new affiliate id.
     * @method
     * @name AffiliateService#applicationValidateAffiliateId
     * @param {string} id - Affiliate id
     * 
     */
    AffiliateService.prototype.applicationValidateAffiliateId = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/application/validate/affiliateId/{id}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate yearly aggregated points. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsPoints
     * @param {string} affiliateId - The affiliate id
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsPoints = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/reports/points';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate offer pairs. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsOfferPairs
     * @param {string} affiliateId - The affiliate id
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsOfferPairs = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/reports/offer-pairs';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate performance data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsPerformance
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} startDate - start date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} endDate - end date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} offerPair - Offer pair filter
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsPerformance = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/reports/performance';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['interval'] !== undefined) {
            queryParameters['interval'] = parameters['interval'];
        }

        if (parameters['startDate'] !== undefined) {
            queryParameters['startDate'] = parameters['startDate'];
        }

        if (parameters['endDate'] !== undefined) {
            queryParameters['endDate'] = parameters['endDate'];
        }

        if (parameters['offerPair'] !== undefined) {
            queryParameters['offerPair'] = parameters['offerPair'];
        }

        if (parameters['device'] !== undefined) {
            queryParameters['device'] = parameters['device'];
        }

        if (parameters['device'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: device'));
            return deferred.promise;
        }

        if (parameters['vertical'] !== undefined) {
            queryParameters['vertical'] = parameters['vertical'];
        }

        if (parameters['vertical'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: vertical'));
            return deferred.promise;
        }

        if (parameters['format'] !== undefined) {
            queryParameters['format'] = parameters['format'];
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate hourly parted performance data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsPerformanceHourlyParted
     * @param {array} affiliateIds - Affiliates
     * @param {array} offerPairIds - Offer pairs in the form X:X
     * @param {string} startDate - start date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} endDate - end date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} vertical - The market vertical
     * 
     */
    AffiliateService.prototype.reportsPerformanceHourlyParted = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/reports/performanceHourlyParted';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters['affiliateIds'] !== undefined) {
            queryParameters['affiliateIds'] = parameters['affiliateIds'];
        }

        if (parameters['offerPairIds'] !== undefined) {
            queryParameters['offerPairIds'] = parameters['offerPairIds'];
        }

        if (parameters['startDate'] !== undefined) {
            queryParameters['startDate'] = parameters['startDate'];
        }

        if (parameters['endDate'] !== undefined) {
            queryParameters['endDate'] = parameters['endDate'];
        }

        if (parameters['vertical'] !== undefined) {
            queryParameters['vertical'] = parameters['vertical'];
        }

        if (parameters['vertical'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: vertical'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate performance data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsPerformanceSubIds
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} startDate - start date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} endDate - end date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} offerPair - Offer pair filter
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {integer} limit - The number of records to return
     * @param {string} sort - The sort to apply
     * @param {string} sortDirection - The sort direction to apply
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsPerformanceSubIds = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/reports/performance/sub-ids';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['interval'] !== undefined) {
            queryParameters['interval'] = parameters['interval'];
        }

        if (parameters['startDate'] !== undefined) {
            queryParameters['startDate'] = parameters['startDate'];
        }

        if (parameters['endDate'] !== undefined) {
            queryParameters['endDate'] = parameters['endDate'];
        }

        if (parameters['offerPair'] !== undefined) {
            queryParameters['offerPair'] = parameters['offerPair'];
        }

        if (parameters['device'] !== undefined) {
            queryParameters['device'] = parameters['device'];
        }

        if (parameters['device'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: device'));
            return deferred.promise;
        }

        if (parameters['vertical'] !== undefined) {
            queryParameters['vertical'] = parameters['vertical'];
        }

        if (parameters['vertical'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: vertical'));
            return deferred.promise;
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters['sort'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: sort'));
            return deferred.promise;
        }

        if (parameters['sortDirection'] !== undefined) {
            queryParameters['sortDirection'] = parameters['sortDirection'];
        }

        if (parameters['sortDirection'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: sortDirection'));
            return deferred.promise;
        }

        if (parameters['format'] !== undefined) {
            queryParameters['format'] = parameters['format'];
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Affiliate top EPC data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsTopEpcAffiliate
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} startDate - start date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} endDate - end date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {integer} limit - The number of records to return
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsTopEpcAffiliate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/{affiliateId}/reports/top-epc';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        path = path.replace('{affiliateId}', parameters['affiliateId']);

        if (parameters['affiliateId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: affiliateId'));
            return deferred.promise;
        }

        if (parameters['interval'] !== undefined) {
            queryParameters['interval'] = parameters['interval'];
        }

        if (parameters['startDate'] !== undefined) {
            queryParameters['startDate'] = parameters['startDate'];
        }

        if (parameters['endDate'] !== undefined) {
            queryParameters['endDate'] = parameters['endDate'];
        }

        if (parameters['device'] !== undefined) {
            queryParameters['device'] = parameters['device'];
        }

        if (parameters['device'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: device'));
            return deferred.promise;
        }

        if (parameters['vertical'] !== undefined) {
            queryParameters['vertical'] = parameters['vertical'];
        }

        if (parameters['vertical'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: vertical'));
            return deferred.promise;
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['format'] !== undefined) {
            queryParameters['format'] = parameters['format'];
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Top EPC data by network.
     * @method
     * @name AffiliateService#reportsTopEpcNetwork
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} startDate - start date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} endDate - end date of the report YYYY-MM-DD HH:mm:ss
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {integer} limit - The number of records to return
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.reportsTopEpcNetwork = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/reports/top-epc';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters['interval'] !== undefined) {
            queryParameters['interval'] = parameters['interval'];
        }

        if (parameters['startDate'] !== undefined) {
            queryParameters['startDate'] = parameters['startDate'];
        }

        if (parameters['endDate'] !== undefined) {
            queryParameters['endDate'] = parameters['endDate'];
        }

        if (parameters['device'] !== undefined) {
            queryParameters['device'] = parameters['device'];
        }

        if (parameters['device'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: device'));
            return deferred.promise;
        }

        if (parameters['vertical'] !== undefined) {
            queryParameters['vertical'] = parameters['vertical'];
        }

        if (parameters['vertical'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: vertical'));
            return deferred.promise;
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['format'] !== undefined) {
            queryParameters['format'] = parameters['format'];
        }

        if (parameters['feed'] !== undefined) {
            queryParameters['feed'] = parameters['feed'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Fetches landing page data
     * @method
     * @name AffiliateService#landings
     * 
     */
    AffiliateService.prototype.landings = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/landings';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            var prefix = this.token.prefix ? this.token.prefix : 'Bearer';
            headers['Authorization'] = prefix + ' ' + this.token.value;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };

        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }

        if (!req.json) {
            if (Object.keys(form).length > 0) {
                req.form = form;
            } else {
                req.form = {};
            }
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return AffiliateService;
})();

exports.AffiliateService = AffiliateService;