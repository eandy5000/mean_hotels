var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("Hotel id ", hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("error finding hotel");
                response.status = 500;
                response.message = err;

            } else if (!doc) {
                console.log("No matching hotel id found ",hotelId);
                response.status = 404 ;
                response.message = {"message" : "hotel id not found ", hotelId }
            } else {
                response.message = doc.reviews ? doc.reviews : []; 
            }
            res
                .status(response.status)
                .json(response.message);
        });

};

module.exports.reviewsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

console.log( "hotel with id ", hotelId ,' review with id ', reviewId);
        
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("error finding hotel");
                response.status = 500;
                response.message = err ;
            } else if (!hotel) {
                console.log(hotelId,"id for hotel not found ");
                response.status = 404;
                response.message = {
                    message :"Hotel id not found ", hotelId
                };
            } else {
                response.message = hotel.reviews.id(reviewId);
             // if a review id doesn't exits mongo returns null
                if (!response.message) {
                    console.log("id not found for review ", reviewId);
                    response.status = 404;
                    response.message = {
                        message : "id for review not found ", reviewId
                    };
                }   
            }


            res
                .status(response.status)
                .json(response.message);
        });
};


var _addReview = function(req, res, hotel) {

    hotel.reviews.push({
        name : req.body.name,
        review : req.body.review,
        rating : parseInt(req.body.rating, 10)
    });

    hotel.save(function(err,updatedHotel){
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(updatedHotel.reviews[updatedHotel.reviews.length-1] );
        }
    });

};


module.exports.reviewsAddOne = function(req, res) {

    var hotelId = req.params.hotelId;
    console.log("hotelId ",hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
            var response = {
                status : 200,
                message : []   
            };
                if (err) {
                    console.log("error finding hotel");
                    response.status = 500;
                    response.message = err;
                } else if (!hotel) {
                    console.log("Hotel id not found ", hotelId);
                    response.status = 404;
                    response.message = { message : "Hotel id not found in database ", hotelId};
                }

                if (hotel) {
                    
                    _addReview(req, res, hotel);

                } else {
                    res
                        .status(response.status)
                        .json(response.message);
                }
            
        });


};

module.exports.reviewsUpdateOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.reviewsDeleteOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function(err, hotel){
            var thisReview;
            var response = {
                status : 200,
                response : {}
            };
            if(err){
                response.status = 500;
                response.message = err;
            } else if(!hotel) {
                response.status = 404;
                response.message = {message : "no matching id for this hotel"};
            } else {
                thisReview = hotel.reviews.id(reviewId);

                if(!thisReview) {
                    response.status = 404;
                    response.message = {message : "review id not found"};
                } 
            }

            if(response.status !== 200) {
                res
                    .status(response.message)
                    .json(response.message);
            } else {
                hotel.reviews.id(reviewId).remove();
                hotel.save(function(err, deletedHotel){
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
                     
            }

        //end exec
        });

};

