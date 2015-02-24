var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
   res.render('login', {title: 'Login'}) ;
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'}
));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;