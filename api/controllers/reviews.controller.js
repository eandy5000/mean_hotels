var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("Hotel id ", hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            console.log(" here is the doc ",doc);
            res
                .status(200)
                .json(doc.reviews)
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

