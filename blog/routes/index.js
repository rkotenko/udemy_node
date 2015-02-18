var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res) {
    // retrieve the blog posts on first page load so they
    // are passed in the same server call
    Post.find({}, function (err, docs) {
        res.render('index', {
            title: 'Express',
            posts:  docs});            
    });
});

module.exports = router;
