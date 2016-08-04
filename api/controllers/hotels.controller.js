var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// var dbConn = require('../data/dbConnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/data.json');

var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // a geojason object

    var point = {
        type : "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
        .geoNear(point, geoOptions, function(err, results, stats){
            console.log("geo results ", results);
            console.log("geo stats ", stats);

            res
                .status(200)
                .json(results);
        });

};

module.exports.hotelsGetAll = function(req, res) {
    // var db = dbConn.get();
    // var collection = db.collection('hotels');
    var offset = 0;
    var count = 5;

    if ( req.query && req.query.lat && req.query.lng ) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }


    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels){
            console.log("Hotels found ",hotels.length);
            res
                .json(hotels);
        });

    // collection.find()
    //           .skip(offset)
    //           .limit(count)
    //           .toArray(function (err, docs){
    //               console.log("found docs ", docs);
    //               res
    //                 .status(200)
    //                 .json(docs)
                  
    //           });

    // console.log("db!!!*** ", db);
    
    // console.log('GET all hotels');
    // console.log("Queries ",req.query);

    // var returnData = hotelData.slice(offset, offset + count);

    // res
    //     .status(200)
    //     .json(returnData);
};

module.exports.hotelsGetOne = function(req, res) {
    // var db = dbConn.get();
    // var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    // var thisHotel = hotelData[hotelId];
    console.log('GET one hotel here is the id ', hotelId );

    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            res
                .status(200)
                .json(doc);
        })

 
    // collection.findOne({
    //     _id : ObjectId(hotelId)
    // }, function(err, doc){
    //     res
    //     .status(200)
    //     .json(doc);
    // })

};

module.exports.hotelsAddOne = function (req, res) {
    var db = dbConn.get();
    var collection = db.collection('hotels');
    var newHotel;


    console.log("POST new hotel ", req.body);

    if (req.body && req.body.name && req.body.stars) {
            console.log(req.body);
            newHotel = req.body;
            newHotel.stars = parseInt(req.body.stars, 10);

            collection.insertOne(newHotel, function (err, response){
                console.log(response.ops);
                res
                    .status(201)
                    .json(response.ops)
            })
        
    } else {
        console.log("Data missing from req.body");
        res
            .status(400)
            .json({message : "Required data missing from body"});
    }



};