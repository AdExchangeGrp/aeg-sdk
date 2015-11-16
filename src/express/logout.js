'use strict';

import async from 'async';
import logger from '@adexchange/aeg-logger';
import _ from 'underscore';
import securityApi from '../api/securityApi';
import { logout } from 'express-stormpath/lib/controllers';

/**
 * Express route to logout a user using security service
 * @param {Request} req
 * @param {Response} res
 */
export default (req, res) => {

	let accessToken = (req.cookies && req.cookies.access_token) ? req.cookies.access_token : null;
	let refreshToken = (req.cookies && req.cookies.refresh_token) ? req.cookies.refresh_token : null;

	securityApi.setToken(accessToken);

	async.series([
		(callback) => {
			if (refreshToken && accessToken) {
				securityApi.revokePasswordToken(
					{
						accessToken: refreshToken
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
						accessToken: accessToken
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

	logout(req, res);
};