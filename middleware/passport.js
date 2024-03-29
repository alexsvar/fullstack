const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwt
};

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await User.findById(payload.userId).select('email id');
				
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch(e) {
				console.log(e);
			}
			
		})
	);
};



// var JwtStrategy = require('passport-jwt').Strategy,
// 	ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// 	User.findOne({id: jwt_payload.sub}, function(err, user) {
// 		if (err) {
// 			return done(err, false);
// 		}
// 		if (user) {
// 			return done(null, user);
// 		} else {
// 			return done(null, false);
// 			// or you could create a new account
// 		}
// 	});
// }));