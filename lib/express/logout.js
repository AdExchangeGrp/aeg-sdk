'use strict';

let async = require('async');
let logger = require('@adexchange/aeg-logger');
let _ = require('underscore');
var securityApi = require('../api/securityApi');
let logoutHandler = require('express-stormpath/lib/controllers').logout;

/**
 * Express route to logout a user using security service
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {

	let accessToken = (req.cookies && req.cookies.access_token) ? 'Bearer ' + req.cookies.access_token : null;
	let refreshToken = (req.cookies && req.cookies.refresh_token) ? 'Bearer ' + req.cookies.refresh_token : null;

	async.series([
		(callback) => {
			if (refreshToken && accessToken) {
				securityApi.revokePasswordToken(
					{
						authorization: accessToken,
						accessToken: refreshToken.split(' ')[1]
					})
					.then(() => {
						callback();
					})
					.fail((err) => {
						logger.warn('Could not remove refresh token', {status: err.response.status, message: err.body});
						callback();
					});
			} else {
				callback();
			}
		},
		(callback) => {
			if (accessToken) {
				securityApi.revokePasswordToken(
					{
						authorization: accessToken,
						accessToken: accessToken.split(' ')[1]
					})
					.then(() => {
						callback();
					})
					.fail((err) => {
						logger.warn('Could not remove access token', {status: err.response.status, message: err.body});
						callback();
					});
			} else {
				callback();
			}
		}
	], _.noop);

	logoutHandler(req, res);
};