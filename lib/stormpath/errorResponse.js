'use strict';

/**
 * Handles an error response from Stormpath
 * @param {Error} err
 * @param {Response} res
 */
export default (err, res) => {
	res.status(err.statusCode || 400).json({
		message: err.userMessage || err.message || (err.statusCode === 401 ? 'Unauthorized' : 'Bad Request')
	});
};