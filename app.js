#!/usr/bin/env node

'use strict';

var CodeGen = require('swagger-js-codegen').CodeGen;
var fs = require('fs');
var request = require('request');
var config = require('config');
var path = require('path');

var securityServiceConfig = config.get('securityService');

var argv = require('yargs')
	.usage('Usage: {0} <command> [options]')
	.command('swaggerCodeGen', 'Generate a swagger API client', function (yargs) {
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

var command = argv._[0];

if (command === 'swaggerCodeGen') {
	var service = argv.s;

	if (service === 'security') {

		getSwaggerSpec(securityServiceConfig.host, (err, result) => {
			if (err) {
				throw err;
			}
			var client = CodeGen.getNodeCode({className: 'SecurityService', swagger: result.body});
			fs.writeFileSync(path.join(__dirname, 'lib', 'api', 'securityService.js'), client);
		});

	}
}

function getSwaggerSpec(host, callback) {
	request(host + '/swagger', {method: 'GET', json: true}, callback);
}