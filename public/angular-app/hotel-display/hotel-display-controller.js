angular.module('meanHotel')

    .controller('displayController', displayController);


function displayController($routeParams, hotelDataFactory) {

  var vm = this;
  var id = $routeParams.id;

  hotelDataFactory.hotelDisplay(id).then(function(response) {
    vm.hotel = response;
 });


// end module    
}; 