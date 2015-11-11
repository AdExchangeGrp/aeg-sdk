'use strict';

/**
 * Manages tokens
 * @type {{}}
 */
module.exports = {

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