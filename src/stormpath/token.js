'use strict';

import njwt from 'njwt';
import config from 'config';

/**
 * Manages tokens
 * @type {{}}
 */
export default {

	/**
	 * Will this token expire soon
	 * @param {string} token
	 * @param {number} seconds
	 * @param {function} callback
	 */
	willExpire: function (token, seconds, callback) {
		let stormpathConfig = config.get('stormpath');
		njwt.verify(token, stormpathConfig.apiKey.secret, (err, result) => {
			if (err) {
				callback(err);
			} else {
				if (new Date((result.body.exp * 1000) - seconds) > new Date()) {
					callback(new Error('Token will expire'));
				} else {
					callback();
				}
			}
		});
	},

	/**
	 * Parses the token from the authorization header
	 * @param {string} authorization
	 * @returns {*}
	 */
	parseTokenFromAuthorization: function (authorization) {
		if (!authorization) {
			return '';
		}
		let parts = authorization.split(' ');
		if (parts.length) {
			return parts[1];
		} else {
			return '';
		}
	},

	/**
	 * Parses an array of scopes from a JWT token
	 * @param {njwt} jwt
	 * @returns {*}
	 */
	parseScopesFromJwt: function (jwt) {
		return jwt.body.scope ? jwt.body.scope.split(' ') : [];
	},

	/**
	 * Determines whether the token is the result of a password OAUTH flow
	 * @param {njwt} jwt
	 */
	isPasswordToken: function (jwt) {
		return jwt.body.sub.match(/https:\/\/api.stormpath.com/);
	}

};