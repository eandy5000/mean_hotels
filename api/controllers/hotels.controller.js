
var dbConn = require('../data/dbConnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/data.json');

module.exports.hotelsGetAll = function(req, res) {
    var db = dbConn.get();
    var collection = db.collection('hotels');
    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    
    collection.find()
              .skip(offset)
              .limit(count)
              .toArray(function (err, docs){
                  console.log("found docs ", docs);
                  res
                    .status(200)
                    .json(docs)
                  
              });

    // console.log("db!!!*** ", db);
    
    // console.log('GET all hotels');
    // console.log("Queries ",req.query);

    // var returnData = hotelData.slice(offset, offset + count);

    // res
    //     .status(200)
    //     .json(returnData);
};

module.exports.hotelsGetOne = function(req, res) {
    var db = dbConn.get();
    var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    // var thisHotel = hotelData[hotelId];
    console.log('GET one hotel here is the id ', hotelId );
 
    collection.findOne({
        _id : ObjectId(hotelId)
    }, function(err, doc){
        res
        .status(200)
        .json(doc);
    })

};

module.exports.hotelsAddOne = function (req, res) {
    console.log("POST new hotel");
    console.log(req.body);
    res 
        .status(200)
        .json(req.body);

};