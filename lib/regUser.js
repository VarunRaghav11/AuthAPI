var User = require('/lib/UserSchema'),
       bcrypt = require('bcrypt'),
    userData = require('/routes/routes');

function create() {
    User.User.create(userData, function (err, user) {
        if (err) {
            return next(err)
        }
        User.User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                userData.session();
            }
        });
    });
}
module.exports = create();
//hashing a password before saving it to the database
User.UserSchema.pre('save', function (next) {
    var user = this;
      bcrypt.hash(user.password, 10, function (err, hash){
          bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});



