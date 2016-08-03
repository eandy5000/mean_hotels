var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controller.js');

// Hotel routes
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll);
    // .post(function(req, res){
    //     console.log("POST json");
    // res
    //     .status(200)
    //     .json({message : "post request"});   
    // });

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne);

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne);


//reviews routes

//get all reviews
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne);


module.exports = router;