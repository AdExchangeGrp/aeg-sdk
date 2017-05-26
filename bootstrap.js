import { CodeGen } from 'swagger-js-codegen';
import fs from 'fs';
import req from 'request';
import config from 'config';
import path from 'path';
import Promise from 'bluebird';

const request = Promise.promisify(req);
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

const command = argv._[0];

runCommand(command)
	.then(() => {

		console.log('done');

	})
	.catch((ex) => {

		console.log(ex.stack);

	});

async function runCommand (command) {

	if (command === 'swaggerCodeGen') {

		const service = argv.s;

		if (service === 'security') {

			await generate('SecurityService', 'security-service.js', securityServiceConfig.swagger);

		} else if (service === 'affiliate') {

			generate('AffiliateService', 'affiliate-service.js', affiliateServiceConfig.swagger);

		} else if (service === 'fulfillment') {

			generate('FulfillmentService', 'fulfillment-service.js', fulfillmentServiceConfig.swagger);

		}

	}

}

async function generate (className, fileName, swagger) {

	const response = await getSwaggerSpec(swagger);

	const client = CodeGen.getCustomCode({
		className: className,
		swagger: response.body,
		template: {
			class: fs.readFileSync('src/swagger/templates/node-class.mustache', 'utf-8'),
			method: fs.readFileSync('src/swagger/templates/method.mustache', 'utf-8'),
			request: fs.readFileSync('src/swagger/templates/node-request.mustache', 'utf-8')
		}
	});

	fs.writeFileSync(path.join(__dirname, 'src', 'api', fileName), client);

}

async function getSwaggerSpec (swagger) {

	return request(swagger, {method: 'GET', json: true});

}
