var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controller.js');

// Hotel routes
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);
    // .post(function(req, res){
    //     console.log("POST json");
    // res
    //     .status(200)
    //     .json({message : "post request"});   
    // });

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne);

// router
//     .route('/hotels/new')
//     .post(ctrlHotels.hotelsAddOne);


//reviews routes

//get all reviews
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne);


module.exports = router;