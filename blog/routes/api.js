var express = require('express'),
    router = express.Router(),
    Post = require('../models/post');
    
// base url: '/api'
router.get('/', function (req, res) {
    Post.find({}, function (err, docs) {
        res.send(docs);
    });    
});

router.post('/', function (req, res) {
   var newPost = new Post(req.body); 
   newPost.save(function (err, doc) {
       res.send(doc);
   });
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Post.remove({_id: id}, function () {
        res.send('success');
    });
});

module.exports = router;