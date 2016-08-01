var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/hotel_app"

var _connection = null;

var opens = function () {
    MongoClient.connect(dbUrl, function (err, db){
        if (err) {
            console.log(err);
            return;
        }
        _connection = db;
        console.log("DB connection open ", db);
        
    });
//open connection
};

var get = function () {
    return _connection;
};

module.exports = {
    opens : opens,
    get : get
}