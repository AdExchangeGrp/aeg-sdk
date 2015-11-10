'use strict';

/**
 * Custom unauthorized API error
 * @param {string} [message] - message
 * @constructor
 */
function Unauthorized(message) {
	let temp = Error.apply(this, arguments);
	temp.name = this.name = 'Unauthorized';
	this.stack = temp.stack;
	this.message = message ? message : 'You are not authorized to access this resource';
	this.statusCode = 401;
}

Unauthorized.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Unauthorized,
		writable: true,
		configurable: true
	}
});

module.exports = Unauthorized;
