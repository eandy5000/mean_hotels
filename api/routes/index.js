var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');

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

module.exports = router;