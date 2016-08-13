angular.module('meanHotel')
    .directive('hotelRating',hotelRating);

//<hotel-rating>


function hotelRating(){
    return {
        restrict :'E',
        template : '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-stars">{{stars}}</span>',
        bindToController : true,
        controller : 'hotelsController',
        controllerAs : 'vm',
        scope : {
            stars : '@'

        } 
    };
}

