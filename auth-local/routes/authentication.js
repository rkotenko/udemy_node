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
/*router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if(err) {
            return next(err);
        }
        
        if(!user) {
            return res.redirect('/auth/login');
        }
        
        // user successfully authenticated
        req.login(user, function (err) {
            if(err) {
                return next(err);
            }
            
            // user has successfully logged in
            return res.redirect('/');
        });
    })(req, res, next);
});*/

module.exports = router;