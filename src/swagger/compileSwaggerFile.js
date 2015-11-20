'use strict';

import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';

export default (swaggerPath) => {

	var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

	let template = fs.readFileSync(path.join(swaggerPath, 'swagger.mustache.yaml'), {encoding: 'utf8'});
	Mustache.parse(template);
	var rendered = Mustache.render(template, {protocol: protocol});
	fs.writeFileSync(path.join(swaggerPath, 'swagger.yaml'), rendered);
};