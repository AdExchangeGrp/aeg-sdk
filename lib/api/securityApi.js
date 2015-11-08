'use strict';

let TestApi = require('./securityService.js').TestApi;
let TokenApi = require('./securityService.js').TokenApi;
let config = require('config');

let securityServiceConfig = config.get('securityService');

class SecurityApi {

	constructor() {
		this._host = securityServiceConfig.host;
		this._baseUrl = securityServiceConfig.baseUrl;
		this._testApi = new TestApi(this._host, this._baseUrl);
		this._tokenApi = new TokenApi(this._host, this._baseUrl);
	}

	get testApi() {
		return this._testApi;
	}

	get tokenApi() {
		return this._tokenApi;
	}
}

module.exports = new SecurityApi();