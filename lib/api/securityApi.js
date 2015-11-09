'use strict';

let SecurityService = require('./securityService.js').SecurityService;
let config = require('config');

let securityServiceConfig = config.get('securityService');

module.exports = new SecurityService(securityServiceConfig.host + securityServiceConfig.baseUrl);