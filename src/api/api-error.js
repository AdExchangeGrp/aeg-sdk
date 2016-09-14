/**
 * Custom error handler for swagger API calls
 * @param {string} [err] - result of a failed api call
 * @constructor
 */
function ApiError (err) {

	let temp = Error.apply(this, arguments);
	temp.name = this.name = 'ApiError';
	this.stack = temp.stack;
	this.message = (err.body && err.body.message) ? err.body.message : 'An unknown error occurred';
	this.statusCode = 400;
	this.body = err.body;

}

ApiError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: ApiError,
		writable: true,
		configurable: true
	}
});

export default ApiError;
