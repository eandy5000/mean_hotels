angular.module('meanHotel')

    .controller('displayController', displayController);


function displayController($routeParams, hotelDataFactory) {
    console.log("wrk");
    var vm = this;
    var id = $routeParams.id;

    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);

    });

function _getStarRating(stars){

    return new Array(stars);
}


// end module    
}; 