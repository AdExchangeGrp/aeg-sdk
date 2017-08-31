/*jshint -W069 */
/* AUTO GENERATED DO NOT EDIT */
/**
 * Security endpoints for CAMP 2.0 services
 * @class SecurityService
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var SecurityService = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');
    var config = require('config');
    var _ = require('lodash');

    function SecurityService(options) {

        var identifier = _.camelCase('SecurityService');

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
     * @name SecurityService#setToken
     * @param {string} value - token's value
     * @param {string} [prefix] - the token header prefix (Basic, Bearer)
     *
     */
    SecurityService.prototype.setToken = function(value, prefix) {
        this.token.value = value;
        this.token.headerOrQueryName = null;
        this.token.isQuery = false;
        this.token.prefix = prefix;
    };

    /**
     * Changes the logging level of the service
     * @method
     * @name SecurityService#controlLogLevel
     * @param {string} level - Log level
     * 
     */
    SecurityService.prototype.controlLogLevel = function(parameters) {
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
     * Creates an api key for an account
     * @method
     * @name SecurityService#createApiKey
     * 
     */
    SecurityService.prototype.createApiKey = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/apiKey';

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
     * Trades an api key for an OAuth 2.0 token
     * @method
     * @name SecurityService#apiToken
     * @param {string} Authorization - Access token

     * @param {string} scope - The scopes to allow
     * 
     */
    SecurityService.prototype.apiToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/apiToken';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: Authorization'));
            return deferred.promise;
        }

        form['grantType'] = 'client_credentials';

        if (parameters['grantType'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: grantType'));
            return deferred.promise;
        }

        if (parameters['scope'] !== undefined) {
            form['scope'] = parameters['scope'];
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
     * Revoke an api token
     * @method
     * @name SecurityService#revokeApiToken
     * 
     */
    SecurityService.prototype.revokeApiToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/apiToken';

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
     * Trades user credentials for an OAuth 2.0 token
     * @method
     * @name SecurityService#passwordToken
     * @param {string} username - Username or email address
     * @param {string} password - User password
     * @param {string} searchTerm - Organization search type
     * @param {string} searchValue - Organization search value
     * 
     */
    SecurityService.prototype.passwordToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/passwordToken';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['username'] !== undefined) {
            form['username'] = parameters['username'];
        }

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            form['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
            return deferred.promise;
        }

        if (parameters['searchTerm'] !== undefined) {
            form['searchTerm'] = parameters['searchTerm'];
        }

        if (parameters['searchValue'] !== undefined) {
            form['searchValue'] = parameters['searchValue'];
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
     * Revoke a password token
     * @method
     * @name SecurityService#revokePasswordToken
     * 
     */
    SecurityService.prototype.revokePasswordToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/passwordToken';

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
     * Trades a refresh token for a new OAuth 2.0 token
     * @method
     * @name SecurityService#refreshPasswordToken
     * @param {string} refreshToken - The refresh token without the bearer
     * 
     */
    SecurityService.prototype.refreshPasswordToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/passwordToken/refresh';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['refreshToken'] !== undefined) {
            form['refreshToken'] = parameters['refreshToken'];
        }

        if (parameters['refreshToken'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: refreshToken'));
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
     * Authorize a resource by checking if any one of the scopes match an account's scopes
     * @method
     * @name SecurityService#authorize
     * @param {array} scopes - Scopes to check authorization
     * @param {boolean} strict - Authorize token source
     * 
     */
    SecurityService.prototype.authorize = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/oauth/authorize';

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

        if (parameters['scopes'] !== undefined) {
            form['scopes'] = parameters['scopes'];
        }

        if (parameters['strict'] !== undefined) {
            form['strict'] = parameters['strict'];
        }

        if (parameters['strict'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: strict'));
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
     * Get the current account
     * @method
     * @name SecurityService#getAccount
     * @param {string} id - The account id
     * 
     */
    SecurityService.prototype.getAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account';

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

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
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
     * Revoke accounts
     * @method
     * @name SecurityService#revokeAccounts
     * @param {array} accounts - Id(s) of the account to remove
     * 
     */
    SecurityService.prototype.revokeAccounts = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account';

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

        if (parameters['accounts'] !== undefined) {
            form['accounts'] = parameters['accounts'];
        }

        if (parameters['accounts'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: accounts'));
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
     * Register's a new account
     * @method
     * @name SecurityService#registerAccount
     * @param {string} organization - Id of the organization to add to
     * @param {string} email - Email address
     * @param {string} password - Password
     * @param {string} title - Title
     * @param {string} givenName - Given / first name
     * @param {string} middleName - Middle name
     * @param {string} surname - Family / last name
     * @param {string} username - Arbitrary user name
     * @param {string} address1 - Address 1
     * @param {string} address2 - Address 2
     * @param {string} city - City
     * @param {string} state - State
     * @param {string} postalCode - Postal Code
     * @param {string} country - Country
     * @param {string} phone - Phone
     * @param {string} slackId - Slack id
     * @param {string} timezone - Timezone
     * 
     */
    SecurityService.prototype.registerAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account';

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

        if (parameters['organization'] !== undefined) {
            form['organization'] = parameters['organization'];
        }

        if (parameters['email'] !== undefined) {
            form['email'] = parameters['email'];
        }

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: email'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            form['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
            return deferred.promise;
        }

        if (parameters['title'] !== undefined) {
            form['title'] = parameters['title'];
        }

        if (parameters['givenName'] !== undefined) {
            form['givenName'] = parameters['givenName'];
        }

        if (parameters['givenName'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: givenName'));
            return deferred.promise;
        }

        if (parameters['middleName'] !== undefined) {
            form['middleName'] = parameters['middleName'];
        }

        if (parameters['surname'] !== undefined) {
            form['surname'] = parameters['surname'];
        }

        if (parameters['surname'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: surname'));
            return deferred.promise;
        }

        if (parameters['username'] !== undefined) {
            form['username'] = parameters['username'];
        }

        if (parameters['address1'] !== undefined) {
            form['address1'] = parameters['address1'];
        }

        if (parameters['address2'] !== undefined) {
            form['address2'] = parameters['address2'];
        }

        if (parameters['city'] !== undefined) {
            form['city'] = parameters['city'];
        }

        if (parameters['state'] !== undefined) {
            form['state'] = parameters['state'];
        }

        if (parameters['postalCode'] !== undefined) {
            form['postalCode'] = parameters['postalCode'];
        }

        if (parameters['country'] !== undefined) {
            form['country'] = parameters['country'];
        }

        if (parameters['phone'] !== undefined) {
            form['phone'] = parameters['phone'];
        }

        if (parameters['slackId'] !== undefined) {
            form['slackId'] = parameters['slackId'];
        }

        if (parameters['timezone'] !== undefined) {
            form['timezone'] = parameters['timezone'];
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
     * Get an account list by organization and or directory
     * @method
     * @name SecurityService#getAccounts
     * @param {string} organization - Organization id
     * @param {string} directory - Directory id
     * 
     */
    SecurityService.prototype.getAccounts = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/accounts';

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

        if (parameters['organization'] !== undefined) {
            queryParameters['organization'] = parameters['organization'];
        }

        if (parameters['directory'] !== undefined) {
            queryParameters['directory'] = parameters['directory'];
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
     * Update an account as the account owner or with an admin scope
     * @method
     * @name SecurityService#updateAccountProfile
     * @param {string} id - Account id
     * @param {string} email - Email address
     * @param {string} title - Title
     * @param {string} givenName - Given / first name
     * @param {string} middleName - Middle name
     * @param {string} surname - Family / last name
     * @param {string} username - Arbitrary user name
     * @param {string} address1 - Address 1
     * @param {string} address2 - Address 2
     * @param {string} city - City
     * @param {string} state - State
     * @param {string} postalCode - Postal Code
     * @param {string} country - Country
     * @param {string} phone - Phone
     * @param {string} slackId - Slack id
     * @param {string} timezone - Timezone
     * 
     */
    SecurityService.prototype.updateAccountProfile = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/profile';

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

        if (parameters['id'] !== undefined) {
            form['id'] = parameters['id'];
        }

        if (parameters['email'] !== undefined) {
            form['email'] = parameters['email'];
        }

        if (parameters['title'] !== undefined) {
            form['title'] = parameters['title'];
        }

        if (parameters['givenName'] !== undefined) {
            form['givenName'] = parameters['givenName'];
        }

        if (parameters['middleName'] !== undefined) {
            form['middleName'] = parameters['middleName'];
        }

        if (parameters['surname'] !== undefined) {
            form['surname'] = parameters['surname'];
        }

        if (parameters['username'] !== undefined) {
            form['username'] = parameters['username'];
        }

        if (parameters['address1'] !== undefined) {
            form['address1'] = parameters['address1'];
        }

        if (parameters['address2'] !== undefined) {
            form['address2'] = parameters['address2'];
        }

        if (parameters['city'] !== undefined) {
            form['city'] = parameters['city'];
        }

        if (parameters['state'] !== undefined) {
            form['state'] = parameters['state'];
        }

        if (parameters['postalCode'] !== undefined) {
            form['postalCode'] = parameters['postalCode'];
        }

        if (parameters['country'] !== undefined) {
            form['country'] = parameters['country'];
        }

        if (parameters['phone'] !== undefined) {
            form['phone'] = parameters['phone'];
        }

        if (parameters['slackId'] !== undefined) {
            form['slackId'] = parameters['slackId'];
        }

        if (parameters['timezone'] !== undefined) {
            form['timezone'] = parameters['timezone'];
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
     * Update an account status as admin
     * @method
     * @name SecurityService#updateAccountStatus
     * @param {string} id - Account id
     * @param {string} status - Status
     * 
     */
    SecurityService.prototype.updateAccountStatus = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/status';

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

        if (parameters['id'] !== undefined) {
            form['id'] = parameters['id'];
        }

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['status'] !== undefined) {
            form['status'] = parameters['status'];
        }

        if (parameters['status'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: status'));
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
     * Requests an account password change
     * @method
     * @name SecurityService#requestPasswordChange
     * @param {string} id - Account id
     * 
     */
    SecurityService.prototype.requestPasswordChange = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/password/request';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
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
     * Validate's an account password change request
     * @method
     * @name SecurityService#validatePasswordChangeRequest
     * @param {string} token - Password change request token
     * 
     */
    SecurityService.prototype.validatePasswordChangeRequest = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/password/request/validate';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['token'] !== undefined) {
            form['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: token'));
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
     * Process an account password change request
     * @method
     * @name SecurityService#processPasswordChangeRequest
     * @param {string} token - Password change request token
     * @param {string} password - Password
     * 
     */
    SecurityService.prototype.processPasswordChangeRequest = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/password/request/process';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['token'] !== undefined) {
            form['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            form['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
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
     * Update an account password as the account owner or with an admin scope
     * @method
     * @name SecurityService#updateAccountPassword
     * @param {string} id - Account id
     * @param {string} organization - Organization id
     * @param {string} email - Email address
     * @param {string} password - Password
     * @param {string} oldPassword - Password
     * 
     */
    SecurityService.prototype.updateAccountPassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/password';

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

        if (parameters['id'] !== undefined) {
            form['id'] = parameters['id'];
        }

        if (parameters['organization'] !== undefined) {
            form['organization'] = parameters['organization'];
        }

        if (parameters['email'] !== undefined) {
            form['email'] = parameters['email'];
        }

        if (parameters['password'] !== undefined) {
            form['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
            return deferred.promise;
        }

        if (parameters['oldPassword'] !== undefined) {
            form['oldPassword'] = parameters['oldPassword'];
        }

        if (parameters['oldPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: oldPassword'));
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
     * Add scopes to an account
     * @method
     * @name SecurityService#addScopesToAccount
     * @param {string} account - The account id to add to
     * @param {array} scopes - The scope id(s) or name to add
     * 
     */
    SecurityService.prototype.addScopesToAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/scope';

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
            form['account'] = parameters['account'];
        }

        if (parameters['account'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: account'));
            return deferred.promise;
        }

        if (parameters['scopes'] !== undefined) {
            form['scopes'] = parameters['scopes'];
        }

        if (parameters['scopes'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: scopes'));
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
     * Remove scopes from an account
     * @method
     * @name SecurityService#removeScopesFromAccount
     * @param {string} account - The account id to remove from
     * @param {array} scopes - The scope id(s) or name to remove
     * 
     */
    SecurityService.prototype.removeScopesFromAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/scope';

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
            form['account'] = parameters['account'];
        }

        if (parameters['account'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: account'));
            return deferred.promise;
        }

        if (parameters['scopes'] !== undefined) {
            form['scopes'] = parameters['scopes'];
        }

        if (parameters['scopes'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: scopes'));
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
     * Validate a new account email
     * @method
     * @name SecurityService#validateAccountEmail
     * @param {string} email - The email to validate
     * 
     */
    SecurityService.prototype.validateAccountEmail = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/account/validate/email/{email}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: email'));
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
     * Get a scopes list by organization and or directory
     * @method
     * @name SecurityService#getScopes
     * @param {string} organization - Organization id
     * @param {string} directory - Directory id
     * 
     */
    SecurityService.prototype.getScopes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/scopes';

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

        if (parameters['organization'] !== undefined) {
            queryParameters['organization'] = parameters['organization'];
        }

        if (parameters['directory'] !== undefined) {
            queryParameters['directory'] = parameters['directory'];
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
     * Gets an organization
     * @method
     * @name SecurityService#getOrganization
     * @param {string} id - The organization to get
     * 
     */
    SecurityService.prototype.getOrganization = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/organization';

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

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

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
     * Delete an organization
     * @method
     * @name SecurityService#deleteOrganization
     * @param {string} id - The resource id of the organization
     * 
     */
    SecurityService.prototype.deleteOrganization = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/organization';

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

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

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
     * Create an organization
     * @method
     * @name SecurityService#createOrganization

     * @param {string} name - The organization name
     * 
     */
    SecurityService.prototype.createOrganization = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/organization';

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

        form['type'] = 'affiliate';

        if (parameters['type'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            form['name'] = parameters['name'];
        }

        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: name'));
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
     * Gets organizations
     * @method
     * @name SecurityService#getOrganizations

     * 
     */
    SecurityService.prototype.getOrganizations = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/organizations';

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

        queryParameters['type'] = 'affiliate';

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
     * Approves an organization
     * @method
     * @name SecurityService#approveOrganization
     * @param {string} id - The resource id of the organization
     * @param {string} rename - The organizations new name & sub-domain
     * 
     */
    SecurityService.prototype.approveOrganization = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/organization/approve';

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

        if (parameters['id'] !== undefined) {
            form['id'] = parameters['id'];
        }

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['rename'] !== undefined) {
            form['rename'] = parameters['rename'];
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

    return SecurityService;
})();

exports.SecurityService = SecurityService;