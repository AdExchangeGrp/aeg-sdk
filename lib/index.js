'use strict';

let securityApi = require('./api/securityApi');
let express = require('./express/index');
let stormpath = require('./stormpath/index');
let errors = require('./errors/index');
let swagger = require('./swagger/index');

module.exports = {
	securityApi: securityApi,
	express: express,
	stormpath: stormpath,
	errors: errors,
	swagger: swagger
};