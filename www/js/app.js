// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordovaBeacon'])

  .run(function ($ionicPlatform, $rootScope) {
    $rootScope.bookings = [];

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        console.log("yes");

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.book', {
        url: '/book',
        views: {
          'menuContent': {
            templateUrl: 'templates/book.html',
            controller: 'BookingCtrl'
          }
        }
      })

      .state('app.myBookings', {
        url: '/mine',
        views: {
          'menuContent': {
            templateUrl: 'templates/my-bookings.html',
            controller: 'ExistingBookingsCtrl'
          }
        }
      })

      .state('app.immediateBooking', {
        url: '/bookNow',
        views: {
          'menuContent': {
            templateUrl: 'templates/immediate-booking.html',
            controller: 'ImmediateRoomBookingController'
          }
        }
      })

      .state('app.immediateAvailability', {
        url: '/roomsNow',
        views: {
          'menuContent': {
            templateUrl: 'templates/immediate-availability.html',
            controller: 'ImmediateRoomsAvailableController'
          }
        }
      })

      .state('app.immediateSuccess', {
        url: '/successfulSpotBooking',
        views: {
          'menuContent': {
            templateUrl: 'templates/success-immediate.html',
            controller: 'ImmediateSuccessController'
          }
        }
      })

      .state('app.laterBooking', {
        url: '/bookLater',
        views: {
          'menuContent': {
            templateUrl: 'templates/later-booking.html',
            controller: 'LaterRoomBookingController'
          }
        }
      })
      
      .state('app.laterAvailability', {
        url: '/roomsLater',
        views: {
          'menuContent': {
            templateUrl: 'templates/later-availability.html',
            controller: 'LaterRoomsAvailableController'
          }
        }
      })
      
      .state('app.laterSuccess', {
        url: '/successfulLaterSpotBooking',
        views: {
          'menuContent': {
            templateUrl: 'templates/success-later.html',
            controller: 'LaterSuccessController'
          }
        }
      })
      
      .state('app.chooseAttendees', {
        url: '/choose-attendees',
        views: {
          'menuContent': {
            templateUrl: 'templates/choose-attendees.html',
            controller: 'PeopleAttendingController'
          }
        }
      })

      .state('app.confirmAttendees', {
        url: '/confirm-attendees',
        views: {
          'menuContent': {
            templateUrl: 'templates/confirm-attendees.html',
            controller: 'ConfirmAttendingController'
          }
        }
      })

      .state('app.myLocation', {
        url: '/myLocation',
        views: {
          'menuContent': {
            templateUrl: 'templates/my-location.html',
            controller: 'MyLocationController'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/book');
  });
