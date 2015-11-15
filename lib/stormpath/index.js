'use strict';

let stormpathAccount = require('./stormpathAccount');
let stormpathOrganization = require('./stormpathOrganization');
let affiliateCustomData = require('./affiliateCustomData');
let errorResponse = require('./errorResponse');
let token = require('./token');

module.exports = {
	stormpathAccount: stormpathAccount,
	stormpathOrganization: stormpathOrganization,
	affiliateCustomData: affiliateCustomData,
	errorResponse: errorResponse,
	token: token
};