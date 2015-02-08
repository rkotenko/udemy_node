var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  var message = req.body.message;
  res.send('Message for you: ' + message);
});

module.exports = router;
