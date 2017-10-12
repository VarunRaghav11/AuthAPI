var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phone: {type: Number, unique: true, required: true}
});

var User = mongoose.model('User', UserSchema);


module.exports = {
    'User': User,
'UserSchema': UserSchema
};
