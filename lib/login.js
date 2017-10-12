var User = require('/lib/UserSchema'),
    bcrypt = require('bcrypt');

//authenticate input against database
User.UserSchema.statics.authenticate = function (email, password, callback) {
    User.User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err2 = new Error('User not found.');
                err2.status = 401;
                return callback(err2);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};