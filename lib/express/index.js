'use strict';

var login = require('./login');
var logout = require('./logout');
var googleOAuthCallback = require('./googleOAuthCallback');

module.exports = {
	login: login,
	logout: logout,
	googleOAuthCallback: googleOAuthCallback
};