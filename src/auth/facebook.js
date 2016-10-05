import passport from 'passport';
import { Strategy } from 'passport-facebook';
import User from '../models/User';

/**
 * Facebook strategy, authenticates user with facebook
 *
 *	Examples:
 *		
 *		import express from 'express';
 *		import Facebook from './auth/facebook';
 *		
 *		let server = express();
 *		
 *		Facebook(server, '/auth/facebook', '/auth/facebook/callback');
 * 
 * @constructor
 * @param {object} server the express server
 * @param {const} URL the url that redirects to facebook for authentication
 * @param {const} callbackURL callback url
 * @param {const} loginURL login page url optional
 * @param {const} clientID facebook app id optional
 * @param {const} clientSecret facebook app secret optional
 */
export default class Facebook {

	constructor(server, URL, callbackURL, clientID = null, clientSecret = null, loginURL = null) {
		const options = {
			clientID: clientID || process.env.FACEBOOK_APP_ID,
			clientSecret: clientSecret || process.env.FACEBOOK_APP_SECRET,
			callbackURL: callbackURL
		};
		passport.use(new Strategy(options, (...params) => this._authenticate.apply(...params)));
		this._setRoutes(server, URL, callbackURL, loginURL);
	}

	_authenticate(accessToken, refreshToken, profile, done) {
		console.log(profile);
		User.find({
			'providerUserId': profile.id
		}, (err, user) => {
			if (err) return done(err);

			if (!user) {
				User.create({
					fullName: profile.displayName,
					email: profile.emails[0].value,
					provider: 'facebook',
					providerUserId: profile.id,
					accessToken: accessToken
				}, (err, user) => {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
	}

	_setRoutes(server, URL, callbackURL, loginURL) {
		server.get(URL, passport.authenticate('facebook', 
			{ scope: ['email'] }
		));

		server.get(callbackURL, passport.authenticate('facebook', 
			{
				successRedirect: '/',
				failureRedirect: loginURL || '/login'
			}
		));
	}
}