var mongoose = require('mongoose');
var serve = "mongodb://localhost:27017";

function mongoConnect(){
    mongoose.connect(serve, function(err){
        console.log(err);
    });
}
function mongoClose() {
    mongoose.disconnect();
}

module.exports = {
    'Connect': mongoConnect(),
    'Close': mongoClose()
}