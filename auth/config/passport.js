var User = require('../models/user');

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