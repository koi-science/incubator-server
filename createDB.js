var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://localhost/incubator', {
    useMongoClient: true
});

module.exports = mongoDB;




