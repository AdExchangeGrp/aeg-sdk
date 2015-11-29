'use strict';

/**
 * Convert swagger validation errors to JSON
 */
export default (err, req, res, next) => {
	if (typeof err !== 'object') {
		err = {
			message: String(err)
		};
	} else {
		Object.defineProperty(err, 'message', {enumerable: true});
	}
	res.statusCode = res.statusCode || 500;
	res.json(err);
};