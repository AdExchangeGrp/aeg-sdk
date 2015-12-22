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
     * Get an application
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
     * Apply to be an affiliate
     * @method
     * @name AffiliateService#applicationApply
     * @param {string} contactEmail - Contact email address and primary user name
     * @param {string} contactPassword - Contact account password
     * @param {string} contactGivenName - Contact given name
     * @param {string} contactSurname - Contact surname
     * @param {string} contactTitle - Contact title
     * @param {string} contactPhone - Contact phone +12345677890
     * @param {string} contactImScreenName - Contact instant messinger screen name
     * @param {string} contactImService - Contact instant messinger service type
     * @param {string} contactAddress - Contact street address
     * @param {string} contactSuite - Contact suite
     * @param {string} contactCity - Contact city
     * @param {string} contactState - Contact state
     * @param {string} contactPostalCode - Contact postal code XXXXX or XXXXX-XXXX
     * @param {string} contactCountry - Contact country
     * @param {string} contactTimezone - Preferred timezone, default's to EST
     * @param {string} company - Company name
     * @param {string} companyTaxId - Company tax id
     * @param {string} companyTaxClass - Company tax class
     * @param {string} companyPayableTo - Company payable to
     * @param {string} companyPayBy - Company pay by type
     * @param {string} companyAddress - Company address
     * @param {string} companySuite - Company suite
     * @param {string} companyCity - Company city
     * @param {string} companyState - Company state
     * @param {string} companyPostalCode - Company postal code XXXXX or XXXXX-XXXX
     * @param {string} companyCountry - Company country
     * @param {string} marketingUrl - Marketing site url
     * @param {string} marketingSiteCategory - Marketing site category
     * @param {number} marketingAnticipatedDailyVolume - Marketing anticipated daily sales volume
     * @param {string} marketingTrafficSources - Marketing traffic sources
     * @param {string} marketingComments - Marketing comments
     * @param {string} marketingHowMarketed - How does the affiliate market
     * 
     */
    AffiliateService.prototype.applicationApply = function(parameters) {
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
            form['contactEmail'] = parameters['contactEmail'];
        }

        if (parameters['contactEmail'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactEmail'));
            return deferred.promise;
        }

        if (parameters['contactPassword'] !== undefined) {
            form['contactPassword'] = parameters['contactPassword'];
        }

        if (parameters['contactPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPassword'));
            return deferred.promise;
        }

        if (parameters['contactGivenName'] !== undefined) {
            form['contactGivenName'] = parameters['contactGivenName'];
        }

        if (parameters['contactGivenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactGivenName'));
            return deferred.promise;
        }

        if (parameters['contactSurname'] !== undefined) {
            form['contactSurname'] = parameters['contactSurname'];
        }

        if (parameters['contactSurname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactSurname'));
            return deferred.promise;
        }

        if (parameters['contactTitle'] !== undefined) {
            form['contactTitle'] = parameters['contactTitle'];
        }

        if (parameters['contactPhone'] !== undefined) {
            form['contactPhone'] = parameters['contactPhone'];
        }

        if (parameters['contactPhone'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPhone'));
            return deferred.promise;
        }

        if (parameters['contactImScreenName'] !== undefined) {
            form['contactImScreenName'] = parameters['contactImScreenName'];
        }

        if (parameters['contactImService'] !== undefined) {
            form['contactImService'] = parameters['contactImService'];
        }

        if (parameters['contactAddress'] !== undefined) {
            form['contactAddress'] = parameters['contactAddress'];
        }

        if (parameters['contactAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactAddress'));
            return deferred.promise;
        }

        if (parameters['contactSuite'] !== undefined) {
            form['contactSuite'] = parameters['contactSuite'];
        }

        if (parameters['contactCity'] !== undefined) {
            form['contactCity'] = parameters['contactCity'];
        }

        if (parameters['contactCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactCity'));
            return deferred.promise;
        }

        if (parameters['contactState'] !== undefined) {
            form['contactState'] = parameters['contactState'];
        }

        if (parameters['contactState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactState'));
            return deferred.promise;
        }

        if (parameters['contactPostalCode'] !== undefined) {
            form['contactPostalCode'] = parameters['contactPostalCode'];
        }

        if (parameters['contactPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactPostalCode'));
            return deferred.promise;
        }

        if (parameters['contactCountry'] !== undefined) {
            form['contactCountry'] = parameters['contactCountry'];
        }

        if (parameters['contactCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: contactCountry'));
            return deferred.promise;
        }

        if (parameters['contactTimezone'] !== undefined) {
            form['contactTimezone'] = parameters['contactTimezone'];
        }

        if (parameters['company'] !== undefined) {
            form['company'] = parameters['company'];
        }

        if (parameters['company'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: company'));
            return deferred.promise;
        }

        if (parameters['companyTaxId'] !== undefined) {
            form['companyTaxId'] = parameters['companyTaxId'];
        }

        if (parameters['companyTaxId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxId'));
            return deferred.promise;
        }

        if (parameters['companyTaxClass'] !== undefined) {
            form['companyTaxClass'] = parameters['companyTaxClass'];
        }

        if (parameters['companyTaxClass'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyTaxClass'));
            return deferred.promise;
        }

        if (parameters['companyPayableTo'] !== undefined) {
            form['companyPayableTo'] = parameters['companyPayableTo'];
        }

        if (parameters['companyPayableTo'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayableTo'));
            return deferred.promise;
        }

        if (parameters['companyPayBy'] !== undefined) {
            form['companyPayBy'] = parameters['companyPayBy'];
        }

        if (parameters['companyPayBy'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPayBy'));
            return deferred.promise;
        }

        if (parameters['companyAddress'] !== undefined) {
            form['companyAddress'] = parameters['companyAddress'];
        }

        if (parameters['companyAddress'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyAddress'));
            return deferred.promise;
        }

        if (parameters['companySuite'] !== undefined) {
            form['companySuite'] = parameters['companySuite'];
        }

        if (parameters['companyCity'] !== undefined) {
            form['companyCity'] = parameters['companyCity'];
        }

        if (parameters['companyCity'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyCity'));
            return deferred.promise;
        }

        if (parameters['companyState'] !== undefined) {
            form['companyState'] = parameters['companyState'];
        }

        if (parameters['companyState'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyState'));
            return deferred.promise;
        }

        if (parameters['companyPostalCode'] !== undefined) {
            form['companyPostalCode'] = parameters['companyPostalCode'];
        }

        if (parameters['companyPostalCode'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyPostalCode'));
            return deferred.promise;
        }

        if (parameters['companyCountry'] !== undefined) {
            form['companyCountry'] = parameters['companyCountry'];
        }

        if (parameters['companyCountry'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: companyCountry'));
            return deferred.promise;
        }

        if (parameters['marketingUrl'] !== undefined) {
            form['marketingUrl'] = parameters['marketingUrl'];
        }

        if (parameters['marketingUrl'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingUrl'));
            return deferred.promise;
        }

        if (parameters['marketingSiteCategory'] !== undefined) {
            form['marketingSiteCategory'] = parameters['marketingSiteCategory'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] !== undefined) {
            form['marketingAnticipatedDailyVolume'] = parameters['marketingAnticipatedDailyVolume'];
        }

        if (parameters['marketingAnticipatedDailyVolume'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingAnticipatedDailyVolume'));
            return deferred.promise;
        }

        if (parameters['marketingTrafficSources'] !== undefined) {
            form['marketingTrafficSources'] = parameters['marketingTrafficSources'];
        }

        if (parameters['marketingTrafficSources'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: marketingTrafficSources'));
            return deferred.promise;
        }

        if (parameters['marketingComments'] !== undefined) {
            form['marketingComments'] = parameters['marketingComments'];
        }

        if (parameters['marketingHowMarketed'] !== undefined) {
            form['marketingHowMarketed'] = parameters['marketingHowMarketed'];
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
     * Returns applications
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
     * Approve an affiliate application
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
     * Deny an affiliate application
     * @method
     * @name AffiliateService#applicationDeny
     * @param {string} id - Application id
     * 
     */
    AffiliateService.prototype.applicationDeny = function(parameters) {
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
     * Validates a new affiliate id
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
     * Affiliate performance data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsPerformance
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} timezone - The timezone string ex. America/New_York
     * @param {string} sort - The sort to apply
     * @param {string} sortDirection - The sort direction to apply
     * 
     */
    AffiliateService.prototype.reportsPerformance = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/performance/{interval}';

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

        path = path.replace('{interval}', parameters['interval']);

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
        }

        if (parameters['timezone'] !== undefined) {
            queryParameters['timezone'] = parameters['timezone'];
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
     * Top 10 EPC data by network
     * @method
     * @name AffiliateService#reportsTop10EpcNetwork
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} timezone - The timezone string ex. America/New_York
     * @param {string} filter - Mobile or desktop
     * 
     */
    AffiliateService.prototype.reportsTop10EpcNetwork = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/reports/top-10-epc/{interval}/{filter}';

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

        path = path.replace('{interval}', parameters['interval']);

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
        }

        if (parameters['timezone'] !== undefined) {
            queryParameters['timezone'] = parameters['timezone'];
        }

        path = path.replace('{filter}', parameters['filter']);

        if (parameters['filter'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: filter'));
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
     * Affiliate top 10 EPC data. Must be the affiliate or admin scoped.
     * @method
     * @name AffiliateService#reportsTop10EpcAffiliate
     * @param {string} affiliateId - The affiliate id
     * @param {string} interval - The time interval to use (weekly, daily, etc...)
     * @param {string} timezone - The timezone string ex. America/New_York
     * @param {string} filter - Mobile or desktop
     * 
     */
    AffiliateService.prototype.reportsTop10EpcAffiliate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/{affiliateId}/reports/top-10-epc/{interval}/{filter}';

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

        path = path.replace('{interval}', parameters['interval']);

        if (parameters['interval'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: interval'));
            return deferred.promise;
        }

        if (parameters['timezone'] !== undefined) {
            queryParameters['timezone'] = parameters['timezone'];
        }

        path = path.replace('{filter}', parameters['filter']);

        if (parameters['filter'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: filter'));
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

    return AffiliateService;
})();

exports.AffiliateService = AffiliateService;