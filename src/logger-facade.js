'use strict';

import _ from 'lodash';

/**
 * Facade for setting up logging
 * @type {{logger: null, initialize: loggerFacade.initialize}}
 */
let loggerFacade = {
	logger: {
		debug: _.noop,
		info: _.noop,
		warn: _.noop,
		error: _.noop,
		errorWithMessage: _.noop
	},
	initialize: function (logger) {
		this.logger = logger;
	}
};

export default loggerFacade;