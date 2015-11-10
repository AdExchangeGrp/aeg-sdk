'use strict';

var unauthorizedError = require('./unauthorizedError');
var apiError = require('./apiError');

module.exports = {
	unauthorizedError: unauthorizedError,
	apiError: apiError
};