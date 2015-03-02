var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

// serialization  and deserialization of session
passport.serializeUser(function(user, next) {
    next(null, user._id); // mongo id not facebook
});

passport.deserializeUser(function(userId, next) {
    User.findById(userId, function(err, user) {
        next(err, user);
    });
});

// Strategies
var fbStrategy = new FacebookStrategy({
    clientID: '815145251866772',
    clientSecret: '36dff38d9ebc08f54bde00cfa053c17f',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, next) {
    User.findOne({fbId: profile.id}, function (err, user) {
        if (user) {
            // user found, so allow access
            next(null, user);
        } else { // no user so let's add them
            var newUser = new User({
                fbId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
            
            newUser.save(function (err, user) {
                if(err) {
                    throw err;
                } 
                
                next(null, user);
            })
        }
    });
});

passport.use(fbStrategy);

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        res.redirect('/auth');
    }
};
