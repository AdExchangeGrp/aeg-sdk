'use strict';

let login = require('./login');
let logout = require('./logout');
let googleOAuthCallback = require('./googleOAuthCallback');

module.exports = {
	login: login,
	logout: logout,
	googleOAuthCallback: googleOAuthCallback
};