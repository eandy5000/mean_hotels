angular.module('meanHotel')

.controller('hotelsController', hotelsController);


function hotelsController(hotelDataFactory) {
    var vm = this;


    vm.title = "MEAN Hotel App";

    hotelDataFactory.hotelList()
                    .then(function(response){
                        vm.hotels = response.data;

                    })



};