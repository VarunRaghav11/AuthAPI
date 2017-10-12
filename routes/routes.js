var express = require('express');
var router = express.Router();
var User = require('/lib/UserSchema');
var create = require('/lib/regUser')

// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

// GET route after registering
router.get('/profile', function (req, res, next) {
          return res.send('GET profile');
        });

//POST route for updating data
router.post('/', function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.phone) {

        var userData = {
            'email': req.body.email,
            'username': req.body.username,
            'password': req.body.password,
            'phone': req.body.phone
        };
        module.exports = {
            'userData': userData,
            'session': session()
        };
        create(userData);
        function session(){
            req.session.UserId = User._id;
            return res.redirect('/profile');
        }
        
    } else if (req.body.email && req.body.password) {
        User.User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});


// GET route after registering
router.get('/', function (req, res, next) {
    User.User.findById(req.session.userId)
        .exec(function (error, user) {
    if (error) {
            return next(error);
        } else {
            return res.json({name: user.name, email: user.email});
    }});
});

module.exports = router;