var express = require('express');
var router = express.Router();
var passport = require('passport');

// base: /auth
router.get('/', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/facebook', 
    passport.authenticate(
        'facebook', {
            scope: 'email'  // telling facebook to return the user email as well
        }
));

router.get('/facebook/callback',
    passport.authenticate(
        'facebook', {
            failureRedirect: '/auth',
            successRedirect: '/'
        }
));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;