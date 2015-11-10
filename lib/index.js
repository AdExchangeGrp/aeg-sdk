'use strict';

let securityApi = require('./api/securityApi');
let login = require('./express/login');

module.exports = {
	securityApi: securityApi,
	login: login
};