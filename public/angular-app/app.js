(function(){
angular.module('meanHotel', ['ngRoute'])

//route config
.config(config)

//basic controller
.controller('hotelsController', hotelsController);


//functions

function config($routeProvider) {

    $routeProvider
        .when('/',{
            templateUrl : 'angular-app/hotel.html',
            controller : hotelsController ,
            controllerAs : 'vm'
        })

};

function hotelsController() {
    var vm = this;

    vm.title = "MEAN Hotel App"
};


//end iife
})();