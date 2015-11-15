'use strict';

let _ = require('underscore');

class OrganizationCustomData {

	constructor(type, customData) {

		this._data = customData;

		this._data.type = type;

		if (!this._data.parent) {
			this._data.parent = null;
		}

		if (!this._data.children) {
			this._data.children = [];
		}
	}

	getCustomData() {
		return this._data;
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

	save(callback) {
		this._data.save(callback);
	}
}

module.exports = OrganizationCustomData;