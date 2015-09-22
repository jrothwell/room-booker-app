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
  .controller('ImmediateRoomBookingController', function ($scope, $state, $rootScope) {
    $rootScope.numberOfParticipants = 4;
    $rootScope.duration = "30";

    $rootScope.whiteboards = false;
    $rootScope.screens = false;
    $rootScope.phones = true;

    $scope.findRooms = function() {
      $state.go("app.immediateAvailability")
    }
  })

  .controller('ImmediateRoomsAvailableController', function($scope, $stateParams, $state, $rootScope) {
    $scope.availableRooms = [
      {
        name: "Mako",
        capacity: 8,
        whiteboards: true
      },
      {
        name: "Lantern",
        capacity: 4,
        whiteboards: true,
        phones: true
      },
      {
        name: "Goblin",
        capacity: 12,
        whiteboards: true,
        phones: true,
        screens: true,
      },
    ];

    $scope.book = function(room) {
      console.log("Booked!");
      $rootScope.bookings.push({
        room: room,
        time: new Date().getTime(),
        immediate: true
      });
      $rootScope.bookedRoom = room;

      $state.go("app.immediateSuccess")
    }

  })

  .controller('LaterRoomBookingController', function ($scope, $stateParams) {

  })
  .controller('MyLocationController', function ($scope, $stateParams) {

  })
  .controller('ImmediateSuccessController', function($scope, $stateParams, $state) {
    $scope.goHome = function() {
      $state.go('app.book');
    }
  });
