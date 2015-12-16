'use strict';

const _ = require('lodash');

export default (val) => {
	return (_.isBoolean(val) ? val : val === 'true');
};