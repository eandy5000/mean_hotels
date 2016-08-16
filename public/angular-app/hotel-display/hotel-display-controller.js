angular.module('meanHotel')

    .controller('displayController', displayController);


function displayController($route, $routeParams, hotelDataFactory) {

  var vm = this;
  var id = $routeParams.id;

  vm.isSubmitted = false;

  vm.addReview = function(){
        var post = {
            name : vm.name,
            rating : vm.rating,
            review : vm.review
        };
        if(vm.reviewForm.$valid){
            hotelDataFactory.postReview(id, post).then(function(response){
                $route.reload();
             });
            }
        };
  hotelDataFactory.hotelDisplay(id).then(function(response) {
    vm.hotel = response.data;
 });


// end module    
}; 