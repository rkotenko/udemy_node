var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // req.user is set up by passport and express
  res.render('index', { title: 'Express', user: req.user});
});

module.exports = router;
