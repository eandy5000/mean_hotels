angular.module('meanHotel')

.controller('hotelsController', hotelsController);


function hotelsController($http) {
    var vm = this;

    vm.title = "MEAN Hotel App";

    $http.get('api/hotels?count=10')
         .then(function(response){
             console.log(response);
            
             vm.hotels = response.data;  
             console.log(vm.hotels); 
         });

};