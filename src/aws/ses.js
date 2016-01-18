'use strict';

import ses from 'node-ses';

class SES {

	constructor(awsKey, awsSecret, zone, options) {
		this._options = options;
		this._client = ses.createClient({key: awsKey, secret: awsSecret, amazon: zone});
	}

	send(to, subject, message, options, callback) {

		let args = Array.prototype.slice.call(arguments);
		to = args.shift();
		subject = args.shift();
		message = args.shift();
		callback = args.pop();
		options = args.length > 0 ? args.shift() : null;

		if (!(options && options.from) && !(this._options && this._options.from)) {
			return callback(new Error('No from address or default provided'));
		}

		let from = options && options.from ? options.from : this._options.from;

		const mailOptions = {
			to: to,
			from: from,
			subject: subject,
			message: message
		};

		this._client.sendEmail(mailOptions, function (err) {
			callback(err);
		});
	}

}

export default SES;