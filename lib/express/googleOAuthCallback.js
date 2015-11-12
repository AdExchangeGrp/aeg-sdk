'use strict';

let helpers = require('express-stormpath/lib/helpers');

/**
 * This is not ready for production use
 * This should write an access_token and refresh_token in place of the account href with scoping
 * We also need some provider data in the token to know the source of the token and check its validity
 * @param {Request} req
 * @param {Response} res
 * @returns {*}
 */
module.exports = function (req, res) {
	var application = req.app.get('stormpathApplication');
	var config = req.app.get('stormpathConfig');
	var logger = req.app.get('stormpathLogger');
	var loginHandler = config.postLoginHandler;
	var registrationHandler = config.postRegistrationHandler;

	if (!req.query.code) {
		logger.info('A user attempted to log in via Google OAuth without specifying an OAuth token.');
		return res.status(400).json({message: 'code parameter required.'});
	}

	var userData = {
		providerData: {
			code: req.query.code,
			providerId: 'google'
		}
	};

	application.getAccount(userData, function (err, resp) {
		if (err) {
			logger.info('During a Google OAuth login attempt, we were unable to fetch the user\'s social account from Stormpath.');
			return res.status(err.status || 400).json(err);
		}

		res.locals.user = resp.account;
		req.user = resp.account;

		//todo: this sucks, we need to use JWT tokens instead of the href to the account
		//this does not check the google server for the validity of the token once its generated
		helpers.createIdSiteSession(req.user, req, res);

		var nextUrl = req.query.next || (resp.created ? config.web.register.nextUri : config.web.login.nextUri);

		if (resp.created && registrationHandler) {
			registrationHandler(req.user, req, res, function () {
				res.redirect(302, nextUrl);
			});
		} else if (loginHandler) {
			loginHandler(req.user, req, res, function () {
				res.redirect(302, nextUrl);
			});
		} else {
			res.redirect(302, nextUrl);
		}
	});

};