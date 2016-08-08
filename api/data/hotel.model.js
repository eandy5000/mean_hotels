var mongoose = require('mongoose');

//Schemas
var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    },
    createdOn : {
        type : Date,
        "default" : Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos :[String],
    Price : Number
});

var hotelSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true    
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0    
    },
    services : [String],
    description : String,
    currency : String,
    photos : [String],
    reviews : [reviewSchema],
    rooms : [roomSchema],
    location :{
        address : String,
        // always store longitude first EW and latitude NS second
        coordinates : {
            type : [Number],
            index: '2dsphere'    
        }
    }


});

mongoose.model('Hotel', hotelSchema, 'hotels');