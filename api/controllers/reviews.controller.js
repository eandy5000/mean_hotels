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

                res
                    .status(response.status)
                    .json(response.message);
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
            console.log(" here is the hotel ", hotel);
        var review = hotel.reviews.id(reviewId);
            res
                .status(200)
                .json(review)
        });
};

