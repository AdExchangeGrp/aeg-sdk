'use strict';

/**
 * Parses swagger parameters by returning its value or null
 * @param {Object} req
 * @param {string} param
 * @returns {Object}
 */
export default (req, param) => {
	return req.swagger.params[param] ? req.swagger.params[param].value : null;
};