'use strict';

import _ from 'lodash';

/**
 * Produces a consistent validation error response with the swagger tools
 * @param {Request} req
 * @param {Response} res
 * @param {Object[]} validationErrors
 */
export default (req, res, validationErrors) => {

	let operation = req.swagger.operation;

	let response = {
		message: "Validation errors",
		errors: _.map(validationErrors, (validationError) => {

			let error = {};

			let indexOfParam = _.findIndex(operation.parameters, (parameter) => {
				return parameter.name === validationError.parameter;
			});

			let param = _.find(operation.parameters, (parameter) => {
				return parameter.name === validationError.parameter;
			});

			error.code = 'INVALID_REQUEST_PARAMETER';

			error.errors = _.map(validationError.errors, (error) => {
				return {
					code: error.code,
					message: error.message,
					path: [],
					description: param.description
				};
			});

			error.in = param.in;
			error.message = `Invalid parameter (${param.name}): Value failed JSON Schema validation`;
			error.name = param.name;
			error.path = [
				"paths",
				operation.pathObject.path,
				operation.method,
				"parameters",
				String(indexOfParam)
			];

			return error;
		})
	};

	res.status(400).json(response);
};