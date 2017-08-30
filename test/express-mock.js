/**
 * Mocks an express app
 */
class ExpressMock {

	get (prop) {

		return this[prop];

	}

	set (prop, val) {

		this[prop] = val;

	}
}

export default new ExpressMock();
