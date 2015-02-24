/*
    This file defines the passport functionality for serialization
    and deserialization of the user as well as the strategy defs to 
    employ.  It also seeds a single user so the database is populated
    easily for class purposes. 
*/
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// seed a user
var user = new User({
    username: 'rob',
    email: 'rob@test.com',
    password: 'test'
});

user.save(function (err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log('Seeded user');
    }
    
});

// session serialization
passport.serializeUser(function (user, next) {
    next(null, user.id);  // equals _id in mongoose
});

passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, user) {
        next(err, user);    
    });
});

// ensure authentication method
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        res.redirect('/auth/login');
    }
};

// Strategies:
var localStrategy = new LocalStrategy(function (username, password, next) {
    User.findOne({username: username}, function (err, user) {
        if(err) {
            return next(err);
        }
        
        if(!user) {
            return next(null, false);  // user was not found
        }    
        
        // user was found, let's test that password!
        user.comparePassword(password, function (err, isMatch) {
            if(err) {
                return next(err);
            }
            
            if(isMatch) {
                return next(null, user);
            } else {
                return next(null, false);  // bad password, fool
            }
        });
    });
});

passport.use(localStrategy);

