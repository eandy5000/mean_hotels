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

