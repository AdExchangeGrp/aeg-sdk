'use strict';

import { CodeGen } from 'swagger-js-codegen';
import fs from 'fs';
import request from 'request';
import config from 'config';
import path from 'path';

let securityServiceConfig = config.get('securityService');

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
	.demand(1)
	.argv;

let command = argv._[0];

if (command === 'swaggerCodeGen') {
	let service = argv.s;

	if (service === 'security') {

		getSwaggerSpec(securityServiceConfig.host, (err, result) => {
			if (err) {
				throw err;
			}
			let client = CodeGen.getCustomCode({
				className: 'SecurityService',
				swagger: result.body,
				template: {
					class: fs.readFileSync('lib/swagger/templates/node-class.mustache', 'utf-8'),
					method: fs.readFileSync('lib/swagger/templates/method.mustache', 'utf-8'),
					request: fs.readFileSync('lib/swagger/templates/node-request.mustache', 'utf-8')
				}
			});
			fs.writeFileSync(path.join(__dirname, 'lib', 'api', 'securityService.js'), client);
		});

	}
}

function getSwaggerSpec(host, callback) {
	request(host + '/swagger', {method: 'GET', json: true}, callback);
}