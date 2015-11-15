'use strict';

let unauthorizedError = require('./unauthorizedError');
let apiError = require('./apiError');

module.exports = {
	unauthorizedError: unauthorizedError,
	apiError: apiError
};