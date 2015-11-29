'use strict';

const _ = require('underscore');

export default (val) => {
	return (_.isBoolean(val) ? val : val === 'true');
};