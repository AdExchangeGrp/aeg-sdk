'use strict';

import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import config from 'config';

/**
 * Compiles a swagger.yaml file from a mustache template
 * @param {String} swaggerPath
 */
export default (swaggerPath) => {

	let adminScopes = [];
	let defaultResponseCodes = [];
	let protocols = ['http', 'https'];

	if (config.has('app')) {
		const appConfig = config.get('app');

		if (appConfig.protocols) {
			protocols = appConfig.protocols;
		}

		if (appConfig.authorizations && appConfig.authorizations.adminScopes) {
			adminScopes = appConfig.authorizations.adminScopes;
		}

		if (appConfig.responseCodes && appConfig.responseCodes.default) {
			defaultResponseCodes = appConfig.responseCodes.default;
		}
	}

	let template = fs.readFileSync(path.join(swaggerPath, 'swagger.mustache.yaml'), {encoding: 'utf8'});
	Mustache.parse(template);
	var rendered = Mustache.render(template, {
		protocols: protocols,
		adminScopes: adminScopes,
		defaultResponseCodes: defaultResponseCodes
	});
	fs.writeFileSync(path.join(swaggerPath, 'swagger.yaml'), rendered);
};