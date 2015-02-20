/*
    The mongoose schema file for a user document.  Contains its def,
    actions to take before a save, and a comparePassword function that
    can be used by the passport localStrategy
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});

// use the mongoose pre hook to ensure that the password is
// encrypted 
userSchema.pre('save', function (next) {
    // check if this is a new password
    if(!this.isModified('password')) {
        return next();  // no change, so no need to go further
    }
    
    // initialize encryption
    var user = this; // store the context for use inside the callbacks
    bcrypt.genSalt(10, function (err, salt) {
        if(err) {
            return next(err);  // shut down EVERYTHING!
        }
        
        // salt is all good, so let's hash it up
        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err) {
                return next(err); // no hash for you!
            } 
            
            // password was hashed to brown, salty goodness
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, next) {
    // compare the saved, encrypted password to the user-entered one
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if(err) {
            return next(err);
        } 
        
        // no error, so pass on true or false
        next(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;