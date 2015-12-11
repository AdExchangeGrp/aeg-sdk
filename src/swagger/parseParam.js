'use strict';

export default (req, param) => {
	return req.swagger.params[param] ? req.swagger.params[param].value : null;
};