(function(){
angular.module('meanHotel', ['ngRoute'])

//route config
.config(config)


//functions

function config($routeProvider) {

    $routeProvider
        .when('/',{
            templateUrl : 'angular-app/hotel-list/hotels.html',
            controller : hotelsController ,
            controllerAs : 'vm'
        })
        .when('/hotels/:id',{
            templateUrl : 'angular-app/hotel-display/hotel.html',
            controller : displayController,
            controllerAs : 'vm'
        });

};




//end iife
})();