'use strict';

import CustomData from './customData';
import _  from 'lodash';

class OrganizationCustomData extends CustomData {

	constructor(type, customData) {

		super(customData);

		this._data.type = type;

		if (!this._data.parent) {
			this._data.parent = null;
		}

		if (!this._data.children) {
			this._data.children = [];
		}
	}

	getType() {
		return this._data.type;
	}

	addChild(organization) {
		if (!_.find(this._data.children, function (child) {
				return child === organization;
			})) {
			this._data.children.push(organization);
		}
	}

	removeChild(organization) {
		this._data.children = _.without(this._data.children, organization);
	}

	getParent() {
		return this._data.parent;
	}

	setParent(parent) {
		this._data.parent = parent;
	}

}

export default OrganizationCustomData;