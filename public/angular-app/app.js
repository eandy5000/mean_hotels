(function(){
angular.module('meanHotel', ['ngRoute'])

//route config
.config(config)


//functions

function config($routeProvider) {

    $routeProvider
        .when('/',{
            templateUrl : 'angular-app/hotel-list/hotel.html',
            controller : hotelsController ,
            controllerAs : 'vm'
        })

};




//end iife
})();