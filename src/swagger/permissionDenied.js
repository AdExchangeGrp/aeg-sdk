'use strict';

/**
 * Custom unauthorized API error
 * @param {string} [message] - message
 * @constructor
 */
function PermissionDenied(message) {
	let temp = Error.apply(this, arguments);
	temp.name = this.name = 'PermissionDenied';
	this.stack = temp.stack;
	this.message = message ? message : 'You are not authorized to access this resource';
	this.statusCode = 403;
}

PermissionDenied.prototype = Object.create(Error.prototype, {
	constructor: {
		value: PermissionDenied,
		writable: true,
		configurable: true
	}
});

export default PermissionDenied;
