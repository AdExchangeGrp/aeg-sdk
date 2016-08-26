'use strict';

import {CodeGen} from 'swagger-js-codegen';
import fs from 'fs';
import request from 'request';
import config from 'config';
import path from 'path';

const securityServiceConfig = config.get('aeg-sdk').securityService;
const affiliateServiceConfig = config.get('aeg-sdk').affiliateService;
const fulfillmentServiceConfig = config.get('aeg-sdk').fulfillmentService;

let argv = require('yargs')
	.usage('Usage: {0} <command> [options]')
	.command('swaggerCodeGen', 'Generate a swagger API client', (yargs) => {
		argv = yargs.option('-s', {
			alias: 'service',
			demand: true,
			description: 'The swagger service name to process',
			nargs: 1
		});
	})
	.example('swaggerCodeGen -s security')
	.example('swaggerCodeGen -s affiliate')
	.example('swaggerCodeGen -s fulfillment')
	.demand(1)
	.argv;

let command = argv._[0];

if (command === 'swaggerCodeGen') {
	let service = argv.s;

	if (service === 'security') {
		generate('SecurityService', 'security-service.js', securityServiceConfig.swagger, (err) => {
			if (err) {
				throw err;
			}
		});
	} else if (service === 'affiliate') {
		generate('AffiliateService', 'affiliate-service.js', affiliateServiceConfig.swagger, (err) => {
			if (err) {
				throw err;
			}
		});
	} else if (service === 'fulfillment') {
		generate('FulfillmentService', 'fulfillment-service.js', fulfillmentServiceConfig.swagger, (err) => {
			if (err) {
				throw err;
			}
		});
	}
}

function generate(className, fileName, swagger, callback) {
	getSwaggerSpec(swagger, (err, result) => {

		if (err) {
			return callback(err);
		}

		let client = CodeGen.getCustomCode({
			className: className,
			swagger: result.body,
			template: {
				class: fs.readFileSync('src/swagger/templates/node-class.mustache', 'utf-8'),
				method: fs.readFileSync('src/swagger/templates/method.mustache', 'utf-8'),
				request: fs.readFileSync('src/swagger/templates/node-request.mustache', 'utf-8')
			}
		});

		fs.writeFileSync(path.join(__dirname, 'src', 'api', fileName), client);

		callback();
	});

}

function getSwaggerSpec(swagger, callback) {
	request(swagger, {method: 'GET', json: true}, callback);
}