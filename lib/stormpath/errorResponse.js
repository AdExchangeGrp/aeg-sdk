'use strict';

/**
 * Handles an error response from Stormpath
 * @param {Error} err
 * @param {Response} res
 */
module.exports = (err, res) => {
	res.status(err.statusCode || 400).json({
		message: err.userMessage || err.message || (err.statusCode === 401 ? 'Unauthorized' : 'Bad Request')
	});
};