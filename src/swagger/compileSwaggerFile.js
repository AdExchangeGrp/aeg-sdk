'use strict';

import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import config from 'config';
import _ from 'underscore';

export default (swaggerPath) => {

	let protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

	let adminScopes = [];

	if (config.has('app')) {
		const appConfig = config.get('app');
		if (appConfig.authorizations && appConfig.authorizations.adminScopes) {
			adminScopes = appConfig.authorizations.adminScopes;
		}
	}

	let template = fs.readFileSync(path.join(swaggerPath, 'swagger.mustache.yaml'), {encoding: 'utf8'});
	Mustache.parse(template);
	var rendered = Mustache.render(template, {protocol: protocol, adminScopes: adminScopes});
	fs.writeFileSync(path.join(swaggerPath, 'swagger.yaml'), rendered);
};