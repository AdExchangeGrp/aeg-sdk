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

    function AffiliateService(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
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
        var path = '/control/logLevel';

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
     * @name AffiliateService#flushAffiliates
     * 
     */
    AffiliateService.prototype.flushAffiliates = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/control/cache/affiliate/flush';

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
     * @name AffiliateService#flushPoints
     * 
     */
    AffiliateService.prototype.flushPoints = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/control/cache/points/flush';

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
     * @name AffiliateService#request
     * @param {string} affiliateId - Affiliate id
     * @param {string} offerPair - The offer pair id in the form of X:X
     * 
     */
    AffiliateService.prototype.request = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/cap/request';

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
     * @name AffiliateService#neutral
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.neutral = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/neutral';

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
     * @name AffiliateService#dislike
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.dislike = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/dislike';

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
     * @name AffiliateService#like
     * @param {string} affiliateId - The affiliate id
     * @param {string} offerId - The offer pair id in the form of X:X
     * @param {integer} funnelId - The funnel id
     * 
     */
    AffiliateService.prototype.like = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/funnel/{funnelId}/offer/{offerId}/preference/like';

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
        var path = '/{affiliateId}/funnel/{funnelId}/offer/{offerId}/skip';

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
     * Sends a notification to ask for more cap
     * @method
     * @name AffiliateService#requestCap
     * @param {string} affiliateId - Affiliate id
     * @param {integer} offerId - Step1 offer id
     * 
     */
    AffiliateService.prototype.requestCap = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/cap/request';

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

        if (parameters['offerId'] !== undefined) {
            form['offerId'] = parameters['offerId'];
        }

        if (parameters['offerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: offerId'));
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
        if (Object.keys(form).length > 0) {
            req.form = form;
        } else {
            req.form = {};
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
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
        var path = '/{affiliateId}/funnels';

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
        var path = '/applications';

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
        var path = '/application/{id}';

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
     * @name AffiliateService#delete
     * @param {string} id - Application id
     * 
     */
    AffiliateService.prototype.delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application/{id}';

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
     * @name AffiliateService#apply
     * @param {string} contactEmail - Contact email address and primary user name
     * @param {string} contactPassword - Contact account password
     * @param {string} contactGivenName - Contact given name
     * @param {string} contactSurname - Contact surname
     * @param {string} contactTitle - Contact title
     * @param {string} contactPhone - Contact phone +12345677890
     * @param {string} contactImScreenName - Contact instant messinger screen name
     * @param {string} contactImService - Contact instant messinger service type
     * @param {string} contactTimezone - Preferred timezone, default's to EST
     * @param {string} contactAddressAddress - Contact street address
     * @param {string} contactAddressSuite - Contact suite
     * @param {string} contactAddressCity - Contact city
     * @param {string} contactAddressState - Contact state
     * @param {string} contactAddressPostalCode - Contact postal code XXXXX or XXXXX-XXXX
     * @param {string} contactAddressCountry - Contact country
     * @param {string} companyCompany - Company name
     * @param {string} companyTaxId - Company tax id
     * @param {string} companyTaxClass - Company tax class
     * @param {string} companyPayableTo - Company payable to
     * @param {string} companyPayBy - Company pay by type
     * @param {string} companyAddressAddress - Company address
     * @param {string} companyAddressSuite - Company suite
     * @param {string} companyAddressCity - Company city
     * @param {string} companyAddressState - Company state
     * @param {string} companyAddressPostalCode - Company postal code XXXXX or XXXXX-XXXX
     * @param {string} companyAddressCountry - Company country
     * @param {string} marketingUrl - Marketing site url
     * @param {string} marketingSiteCategory - Marketing site category
     * @param {number} marketingAnticipatedDailyVolume - Marketing anticipated daily sales volume
     * @param {string} marketingTrafficSources - Marketing traffic sources
     * @param {string} marketingComments - Marketing comments
     * @param {string} marketingHowMarketed - How does the affiliate market
     * 
     */
    AffiliateService.prototype.apply = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['contactEmail'] !== undefined) {
            form['contact.email'] = parameters['contactEmail'];
        }

        if (parameters['contactEmail'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactEmail'));
            return deferred.promise;
        }

        if (parameters['contactPassword'] !== undefined) {
            form['contact.password'] = parameters['contactPassword'];
        }

        if (parameters['contactPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPassword'));
            return deferred.promise;
        }

        if (parameters['contactGivenName'] !== undefined) {
            form['contact.givenName'] = parameters['contactGivenName'];
        }

        if (parameters['contactGivenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactGivenName'));
            return deferred.promise;
        }

        if (parameters['contactSurname'] !== undefined) {
            form['contact.surname'] = parameters['contactSurname'];
        }

        if (parameters['contactSurname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactSurname'));
            return deferred.promise;
        }

        if (parameters['contactTitle'] !== undefined) {
            form['contact.title'] = parameters['contactTitle'];
        }

        if (parameters['contactPhone'] !== undefined) {
            form['contact.phone'] = parameters['contactPhone'];
        }

        if (parameters['contactPhone'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPhone'));
            return deferred.promise;
        }

        if (parameters['contactImScreenName'] !== undefined) {
            form['contact.im.screenName'] = parameters['contactImScreenName'];
        }

        if (parameters['contactImService'] !== undefined) {
            form['contact.im.service'] = parameters['contactImService'];
        }

        if (parameters['contactTimezone'] !== undefined) {
            form['contact.timezone'] = parameters['contactTimezone'];
        }

        if (parameters['contactAddressAddress'] !== undefined) {
            form['contact.address.address'] = parameters['contactAddressAddress'];
        }

        if (parameters['contactAddressAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressAddress'));
            return deferred.promise;
        }

        if (parameters['contactAddressSuite'] !== undefined) {
            form['contact.address.suite'] = parameters['contactAddressSuite'];
        }

        if (parameters['contactAddressCity'] !== undefined) {
            form['contact.address.city'] = parameters['contactAddressCity'];
        }

        if (parameters['contactAddressCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressCity'));
            return deferred.promise;
        }

        if (parameters['contactAddressState'] !== undefined) {
            form['contact.address.state'] = parameters['contactAddressState'];
        }

        if (parameters['contactAddressState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressState'));
            return deferred.promise;
        }

        if (parameters['contactAddressPostalCode'] !== undefined) {
            form['contact.address.postalCode'] = parameters['contactAddressPostalCode'];
        }

        if (parameters['contactAddressPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressPostalCode'));
            return deferred.promise;
        }

        if (parameters['contactAddressCountry'] !== undefined) {
            form['contact.address.country'] = parameters['contactAddressCountry'];
        }

        if (parameters['contactAddressCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressCountry'));
            return deferred.promise;
        }

        if (parameters['companyCompany'] !== undefined) {
            form['company.company'] = parameters['companyCompany'];
        }

        if (parameters['companyCompany'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyCompany'));
            return deferred.promise;
        }

        if (parameters['companyTaxId'] !== undefined) {
            form['company.taxId'] = parameters['companyTaxId'];
        }

        if (parameters['companyTaxId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxId'));
            return deferred.promise;
        }

        if (parameters['companyTaxClass'] !== undefined) {
            form['company.taxClass'] = parameters['companyTaxClass'];
        }

        if (parameters['companyTaxClass'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxClass'));
            return deferred.promise;
        }

        if (parameters['companyPayableTo'] !== undefined) {
            form['company.payableTo'] = parameters['companyPayableTo'];
        }

        if (parameters['companyPayableTo'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayableTo'));
            return deferred.promise;
        }

        if (parameters['companyPayBy'] !== undefined) {
            form['company.payBy'] = parameters['companyPayBy'];
        }

        if (parameters['companyPayBy'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayBy'));
            return deferred.promise;
        }

        if (parameters['companyAddressAddress'] !== undefined) {
            form['company.address.address'] = parameters['companyAddressAddress'];
        }

        if (parameters['companyAddressAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressAddress'));
            return deferred.promise;
        }

        if (parameters['companyAddressSuite'] !== undefined) {
            form['company.address.suite'] = parameters['companyAddressSuite'];
        }

        if (parameters['companyAddressCity'] !== undefined) {
            form['company.address.city'] = parameters['companyAddressCity'];
        }

        if (parameters['companyAddressCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressCity'));
            return deferred.promise;
        }

        if (parameters['companyAddressState'] !== undefined) {
            form['company.address.state'] = parameters['companyAddressState'];
        }

        if (parameters['companyAddressState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressState'));
            return deferred.promise;
        }

        if (parameters['companyAddressPostalCode'] !== undefined) {
            form['company.address.postalCode'] = parameters['companyAddressPostalCode'];
        }

        if (parameters['companyAddressPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressPostalCode'));
            return deferred.promise;
        }

        if (parameters['companyAddressCountry'] !== undefined) {
            form['company.address.country'] = parameters['companyAddressCountry'];
        }

        if (parameters['companyAddressCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressCountry'));
            return deferred.promise;
        }

        if (parameters['marketingUrl'] !== undefined) {
            form['marketing.url'] = parameters['marketingUrl'];
        }

        if (parameters['marketingUrl'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingUrl'));
            return deferred.promise;
        }

        if (parameters['marketingSiteCategory'] !== undefined) {
            form['marketing.siteCategory'] = parameters['marketingSiteCategory'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] !== undefined) {
            form['marketing.anticipatedDailyVolume'] = parameters['marketingAnticipatedDailyVolume'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingAnticipatedDailyVolume'));
            return deferred.promise;
        }

        if (parameters['marketingTrafficSources'] !== undefined) {
            form['marketing.trafficSources'] = parameters['marketingTrafficSources'];
        }

        if (parameters['marketingTrafficSources'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingTrafficSources'));
            return deferred.promise;
        }

        if (parameters['marketingComments'] !== undefined) {
            form['marketing.comments'] = parameters['marketingComments'];
        }

        if (parameters['marketingHowMarketed'] !== undefined) {
            form['marketing.howMarketed'] = parameters['marketingHowMarketed'];
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
     * @name AffiliateService#resubmit
     * @param {string} contactGivenName - Contact given name
     * @param {string} contactSurname - Contact surname
     * @param {string} contactTitle - Contact title
     * @param {string} contactPhone - Contact phone +12345677890
     * @param {string} contactImScreenName - Contact instant messinger screen name
     * @param {string} contactImService - Contact instant messinger service type
     * @param {string} contactTimezone - Preferred timezone, default's to EST
     * @param {string} contactAddressAddress - Contact street address
     * @param {string} contactAddressSuite - Contact suite
     * @param {string} contactAddressCity - Contact city
     * @param {string} contactAddressState - Contact state
     * @param {string} contactAddressPostalCode - Contact postal code XXXXX or XXXXX-XXXX
     * @param {string} contactAddressCountry - Contact country
     * @param {string} companyCompany - Company name
     * @param {string} companyTaxId - Company tax id
     * @param {string} companyTaxClass - Company tax class
     * @param {string} companyPayableTo - Company payable to
     * @param {string} companyPayBy - Company pay by type
     * @param {string} companyAddressAddress - Company address
     * @param {string} companyAddressSuite - Company suite
     * @param {string} companyAddressCity - Company city
     * @param {string} companyAddressState - Company state
     * @param {string} companyAddressPostalCode - Company postal code XXXXX or XXXXX-XXXX
     * @param {string} companyAddressCountry - Company country
     * @param {string} marketingUrl - Marketing site url
     * @param {string} marketingSiteCategory - Marketing site category
     * @param {number} marketingAnticipatedDailyVolume - Marketing anticipated daily sales volume
     * @param {string} marketingTrafficSources - Marketing traffic sources
     * @param {string} marketingComments - Marketing comments
     * @param {string} marketingHowMarketed - How does the affiliate market
     * 
     */
    AffiliateService.prototype.resubmit = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application/account/resubmit';

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

        if (parameters['contactGivenName'] !== undefined) {
            form['contact.givenName'] = parameters['contactGivenName'];
        }

        if (parameters['contactGivenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactGivenName'));
            return deferred.promise;
        }

        if (parameters['contactSurname'] !== undefined) {
            form['contact.surname'] = parameters['contactSurname'];
        }

        if (parameters['contactSurname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactSurname'));
            return deferred.promise;
        }

        if (parameters['contactTitle'] !== undefined) {
            form['contact.title'] = parameters['contactTitle'];
        }

        if (parameters['contactPhone'] !== undefined) {
            form['contact.phone'] = parameters['contactPhone'];
        }

        if (parameters['contactPhone'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPhone'));
            return deferred.promise;
        }

        if (parameters['contactImScreenName'] !== undefined) {
            form['contact.im.screenName'] = parameters['contactImScreenName'];
        }

        if (parameters['contactImService'] !== undefined) {
            form['contact.im.service'] = parameters['contactImService'];
        }

        if (parameters['contactTimezone'] !== undefined) {
            form['contact.timezone'] = parameters['contactTimezone'];
        }

        if (parameters['contactAddressAddress'] !== undefined) {
            form['contact.address.address'] = parameters['contactAddressAddress'];
        }

        if (parameters['contactAddressAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressAddress'));
            return deferred.promise;
        }

        if (parameters['contactAddressSuite'] !== undefined) {
            form['contact.address.suite'] = parameters['contactAddressSuite'];
        }

        if (parameters['contactAddressCity'] !== undefined) {
            form['contact.address.city'] = parameters['contactAddressCity'];
        }

        if (parameters['contactAddressCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressCity'));
            return deferred.promise;
        }

        if (parameters['contactAddressState'] !== undefined) {
            form['contact.address.state'] = parameters['contactAddressState'];
        }

        if (parameters['contactAddressState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressState'));
            return deferred.promise;
        }

        if (parameters['contactAddressPostalCode'] !== undefined) {
            form['contact.address.postalCode'] = parameters['contactAddressPostalCode'];
        }

        if (parameters['contactAddressPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressPostalCode'));
            return deferred.promise;
        }

        if (parameters['contactAddressCountry'] !== undefined) {
            form['contact.address.country'] = parameters['contactAddressCountry'];
        }

        if (parameters['contactAddressCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddressCountry'));
            return deferred.promise;
        }

        if (parameters['companyCompany'] !== undefined) {
            form['company.company'] = parameters['companyCompany'];
        }

        if (parameters['companyCompany'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyCompany'));
            return deferred.promise;
        }

        if (parameters['companyTaxId'] !== undefined) {
            form['company.taxId'] = parameters['companyTaxId'];
        }

        if (parameters['companyTaxId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxId'));
            return deferred.promise;
        }

        if (parameters['companyTaxClass'] !== undefined) {
            form['company.taxClass'] = parameters['companyTaxClass'];
        }

        if (parameters['companyTaxClass'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxClass'));
            return deferred.promise;
        }

        if (parameters['companyPayableTo'] !== undefined) {
            form['company.payableTo'] = parameters['companyPayableTo'];
        }

        if (parameters['companyPayableTo'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayableTo'));
            return deferred.promise;
        }

        if (parameters['companyPayBy'] !== undefined) {
            form['company.payBy'] = parameters['companyPayBy'];
        }

        if (parameters['companyPayBy'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayBy'));
            return deferred.promise;
        }

        if (parameters['companyAddressAddress'] !== undefined) {
            form['company.address.address'] = parameters['companyAddressAddress'];
        }

        if (parameters['companyAddressAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressAddress'));
            return deferred.promise;
        }

        if (parameters['companyAddressSuite'] !== undefined) {
            form['company.address.suite'] = parameters['companyAddressSuite'];
        }

        if (parameters['companyAddressCity'] !== undefined) {
            form['company.address.city'] = parameters['companyAddressCity'];
        }

        if (parameters['companyAddressCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressCity'));
            return deferred.promise;
        }

        if (parameters['companyAddressState'] !== undefined) {
            form['company.address.state'] = parameters['companyAddressState'];
        }

        if (parameters['companyAddressState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressState'));
            return deferred.promise;
        }

        if (parameters['companyAddressPostalCode'] !== undefined) {
            form['company.address.postalCode'] = parameters['companyAddressPostalCode'];
        }

        if (parameters['companyAddressPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressPostalCode'));
            return deferred.promise;
        }

        if (parameters['companyAddressCountry'] !== undefined) {
            form['company.address.country'] = parameters['companyAddressCountry'];
        }

        if (parameters['companyAddressCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddressCountry'));
            return deferred.promise;
        }

        if (parameters['marketingUrl'] !== undefined) {
            form['marketing.url'] = parameters['marketingUrl'];
        }

        if (parameters['marketingUrl'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingUrl'));
            return deferred.promise;
        }

        if (parameters['marketingSiteCategory'] !== undefined) {
            form['marketing.siteCategory'] = parameters['marketingSiteCategory'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] !== undefined) {
            form['marketing.anticipatedDailyVolume'] = parameters['marketingAnticipatedDailyVolume'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingAnticipatedDailyVolume'));
            return deferred.promise;
        }

        if (parameters['marketingTrafficSources'] !== undefined) {
            form['marketing.trafficSources'] = parameters['marketingTrafficSources'];
        }

        if (parameters['marketingTrafficSources'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingTrafficSources'));
            return deferred.promise;
        }

        if (parameters['marketingComments'] !== undefined) {
            form['marketing.comments'] = parameters['marketingComments'];
        }

        if (parameters['marketingHowMarketed'] !== undefined) {
            form['marketing.howMarketed'] = parameters['marketingHowMarketed'];
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
     * @name AffiliateService#approve
     * @param {string} id - Application id
     * @param {string} affiliateId - The new affiliate id and sub-domain
     * 
     */
    AffiliateService.prototype.approve = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application/{id}/approve';

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
     * @name AffiliateService#deny
     * @param {string} id - Application id
     * @param {string} denialReason - Denial reason
     * 
     */
    AffiliateService.prototype.deny = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application/{id}/deny';

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
     * @name AffiliateService#validateAffiliateId
     * @param {string} id - Affiliate id
     * 
     */
    AffiliateService.prototype.validateAffiliateId = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/application/validate/affiliateId/{id}';

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
     * @name AffiliateService#points
     * @param {string} affiliateId - The affiliate id
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.points = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/points';

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
     * @name AffiliateService#offerPairs
     * @param {string} affiliateId - The affiliate id
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.offerPairs = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/offer-pairs';

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
     * @name AffiliateService#performance
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} offerPair - Offer pair filter
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.performance = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/performance';

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

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
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
     * Affiliate performance data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#performanceSubIds
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
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
    AffiliateService.prototype.performanceSubIds = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/performance/sub-ids';

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

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
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
     * @name AffiliateService#topEpc
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {integer} limit - The number of records to return
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.topEpc = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/top-epc';

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

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
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
     * @name AffiliateService#topEpc
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} device - Mobile or desktop
     * @param {string} vertical - The market vertical
     * @param {integer} limit - The number of records to return
     * @param {string} format - The output format, csv returns a link to download a report
     * @param {string} feed - Archival or realtime data feed, defaults to archival
     * 
     */
    AffiliateService.prototype.topEpc = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/reports/top-epc';

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

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
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

    return AffiliateService;
})();

exports.AffiliateService = AffiliateService;