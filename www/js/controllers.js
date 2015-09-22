angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
  })

  .controller('BookingCtrl', function ($scope, $state) {
    $scope.bookForNow = function() {
      $state.go("app.immediateBooking");
    };

    $scope.bookForLater = function() {
      $state.go("app.laterBooking");
    };
  })
  .controller('ExistingBookingsCtrl', function ($scope, $stateParams) {

  })
  .controller('ImmediateRoomBookingController', function ($scope, $stateParams) {

  })
  .controller('LaterRoomBookingController', function ($scope, $stateParams) {

  });
