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
            if (err) {
                console.log("or finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                res
                    .status(200)
                    .json(results);
            }
            
        });

};

module.exports.hotelsGetAll = function(req, res) {
    // var db = dbConn.get();
    // var collection = db.collection('hotels');
    var offset = 0;
    var count = 5;
    var maxCount = 10;

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

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "count and offset must be a Number"
            });
            return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message" : "count limit of " + maxCount + " exceded"
            });
            return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels){
            if (err) {
                console.log("Error finding hotels");

                res
                    .status(500)
                    .json(err);
            } else {
            console.log("Hotels found ",hotels.length);
            res
                .json(hotels);
            }
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
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error retreiving Hotel");
                response.status = 500;
                response.message = err;
                
            } else if(!doc){
                response.status = 404;
                response.message = {
                    "message" : "hotel id not found"
                };

            } 

            res
                .status(response.status)
                .json(response.message);
            
        })

 
    // collection.findOne({
    //     _id : ObjectId(hotelId)
    // }, function(err, doc){
    //     res
    //     .status(200)
    //     .json(doc);
    // })

};

var _splitArray = function (input) {
    console.log("splitarray input ",input);
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    console.log("input ",input," output ",output);
    return output;
};


module.exports.hotelsAddOne = function (req, res) {

    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars, 10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function(err, hotel){
            if(err) {
                console.log("Error creating document");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("hotel created ",hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        })


};

module.exports.hotelsUpdateOne = function(req, res){
var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('-reviews -rooms')
    .exec(function(err, hotel) {
      if (err) {
        console.log("Error finding hotel");
        res
          .status(500)
          .json(err);
          return;
      } else if(!hotel) {
        console.log("HotelId not found in database", hotelId);
        res
          .status(404)
          .lson({
            "message" : "Hotel ID not found " + hotelId
          });
          return;
      }

      hotel.name = req.body.name;
      hotel.description = req.body.description;
      hotel.stars = parseInt(req.body.stars,10);
      hotel.services = _splitArray(req.body.services);
      hotel.photos = _splitArray(req.body.photos);
      hotel.currency = req.body.currency;
      hotel.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      hotel.save(function(err, hotelUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });


//end updateOne
};  
