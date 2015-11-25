/*jshint -W069 */
/**
 * Affiliate operations for Camp 2.0
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
     * Returns 'Hello' to the caller
     * @method
     * @name AffiliateService#test
     * @param {string} name - The name of the person to whom to say hello
     * 
     */
    AffiliateService.prototype.test = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/test';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
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
        if (Object.keys(form).length > 0) {
            req.form = form;
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
     * Returns 'Hello' to the caller
     * @method
     * @name AffiliateService#testScopeProtected
     * @param {string} name - The name of the person to whom to say hello
     * 
     */
    AffiliateService.prototype.testScopeProtected = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/testScopeProtected';

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

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
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
        if (Object.keys(form).length > 0) {
            req.form = form;
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

    return AffiliateService;
})();

exports.AffiliateService = AffiliateService;