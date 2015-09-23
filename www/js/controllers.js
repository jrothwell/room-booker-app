var api = "http://172.20.10.4:3030/";

angular.module('starter.controllers', [])
  .service('sharedProperties', function () {
    var requiredCapacity = 4;

    return {
      getCapacity: function () {
        return requiredCapacity;
      },
      setCapacity: function(value) {
        requiredCapacity = value;
      }
    };
  })
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
  .controller('ImmediateRoomBookingController', function ($scope, $state, $rootScope, sharedProperties) {
    $rootScope.bookingDetails = {
      numberOfParticipants:4,
      duration: "30",
      whiteboards: false,
      screens: false,
      phones: true
    };

    $scope.findRooms = function() {
      sharedProperties.setCapacity($rootScope.bookingDetails.numberOfParticipants);
      $state.go("app.immediateAvailability");
    }
  })

  .controller('ImmediateRoomsAvailableController', function($scope, $stateParams, $state, $rootScope, sharedProperties, $http) {
    var requiredCapacity = sharedProperties.getCapacity();

    $scope.availableRooms = [];

    $http.post(api + 'roomNow/', {
      duration: $rootScope.duration,
      location: {
        city: "London",
        buildingId: 1,
        floor: 1
      },
      capacity: requiredCapacity
    }).then(function success(response) {
      response.data.map(function(room) {
        $scope.availableRooms.push({
          name: room.roomName,
          capacity: room.capacity,
          whiteboards: room.facilities.wheelChairAccess,
          phones: room.facilities.videoCon,
          screens: room.facilities.projector,
          floor: room.floor
        });
      });
    }, function failure(response) {
      console.log("FAILED!");
    })

    $scope.book = function(room) {
      console.log("Booked!");
      $rootScope.bookings.push({
        room: room,
        time: new Date(),
        immediate: true,
        duration: $rootScope.duration
      });
      $rootScope.bookedRoom = room;

      $state.go("app.immediateSuccess")
    }

  })

  .controller('LaterRoomBookingController', function ($scope, $state, $stateParams, $rootScope) {
    dateTime = new Date();
    $rootScope.dateAndTime = new Date(dateTime.getFullYear(), dateTime.getMonth(),
                                  (dateTime.getDate() + 1), 9, 0, 0, 0);

    $rootScope.bookingDetails = {
      numberOfParticipants:0,
      duration: "30",
      whiteboards: false,
      screens: false,
      phones: true,
      dateAndTime: $rootScope.dateAndTime
    };

    $scope.chooseAttendees = function() {
      $state.go("app.chooseAttendees");
    };

    $scope.findRooms = function() {
      if ($rootScope.attendees.length != 0) {
        $state.go("app.laterAvailability");
      }
    };
  })

    .controller('LaterRoomsAvailableController', function($scope, $stateParams, $state, $rootScope) {
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
        name: "Park",
        capacity: 12,
        whiteboards: true,
        phones: true,
        screens: true
      }
    ];

    $scope.book = function(room) {
      console.log("Booked!");
      $rootScope.bookings.push({
        room: room,
        time: $rootScope.dateAndTime,
        immediate: false,
        duration: $rootScope.duration
      });
      $rootScope.bookedRoom = room;

      $rootScope.bookingDetails.numberOfParticipants = 0;
      $rootScope.attendees.length = 0;
      $state.go("app.laterSuccess");
    }

  })

  .controller('MyLocationController', function ($scope, $stateParams, $rootScope, $ionicPlatform, $cordovaBeacon, $http) {

    $scope.beacons = {};
    $scope.currentRoom = '';

    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestWhenInUseAuthorization();

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            var data = [];
            // $http.get('http://10.132.32.162:3030/phones/sam/currentRoom')
            $http.get(api + 'phones/sam/currentRoom')
            .then(function(response) {
              console.log(response.data.roomName);
               if ($scope.currentRoom !== response.data.roomName) {
                  $scope.currentRoom = response.data.roomName;

               }
               console.log(response);
            });
            for(var i = 0; i < pluginResult.beacons.length; i++) {
              if (pluginResult.beacons[i].major == 14470) {
                //console.log(pluginResult.beacons[i].rssi + "  FUTURE-3");
                data.push({
                  "sensorId": "FUTURE-3",
                  "distance": pluginResult.beacons[i].rssi,
                });
              }
              else if (pluginResult.beacons[i].major == 1000) {
                //console.log(pluginResult.beacons[i].rssi + "  FUTURE-2");
                data.push({
                  "sensorId": "FUTURE-2",
                  "distance": pluginResult.beacons[i].rssi,
                });
              } else {
                //console.log(pluginResult.beacons[i].rssi + "  FUTURE-1");
                data.push({
                  "sensorId": "FUTURE-1",
                  "distance": pluginResult.beacons[i].rssi,
                });
              }
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
            }

            $http.put(api + '/phones/sam/beaconData', data)
                .then(function(response) {
                    //console.log(response);
                })
                .catch(function(response) {
                    //console.log(response);
                });

            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Light Blue", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 14470, 61580));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Purple", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 1000, 1));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Green", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 4473, 1));


    });
  })
  .controller('ImmediateSuccessController', function($scope, $stateParams, $state, $ionicHistory) {
    $scope.goHome = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.book');
    }
  })

  .controller('LaterSuccessController', function($scope, $stateParams, $state, $ionicHistory) {
    $scope.goHome = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.book');
    }
  })

  .controller('PeopleAttendingController', function ($scope, $state, $stateParams, $rootScope) {
    $rootScope.attendees = [];
    $rootScope.locOfAttendees = {};

    $scope.people = [{
      "location":"London Building 1",
      "name": "Ben",
      "selected": false
    },
    {
      "location":"London Building 1",
      "name": "Luke",
      "selected": false
    },
    {
      "location":"London Building 1",
      "name": "Linda",
      "selected": false
    },
    {
      "location":"Lodon Building 2",
      "name":"Emma",
      "selected": false
    },
    {
      "location":"London Building 3",
      "name":"Tom",
      "selected": false
    },
    {
      "location":"London Building 1",
      "name":"Jenny",
      "selected": false
    }];

    $scope.clearAttendeeList = function() {
      for (var i = 0; i < $scope.people.length; i++) {
        $scope.people[i].selected = false;
      };
    }

    function isNotEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return true;
      }
      return false;
    }

    $rootScope.confirmAttendees = function() {
      $rootScope.attendees.length = 0;
      $rootScope.locOfAttendees = {};
      for (var i = 0; i < $scope.people.length; i++) {
        var value = $scope.people[i];
        if (value.selected) {
          $rootScope.attendees.push(value);
          if ($rootScope.locOfAttendees.hasOwnProperty(value.location)) {
            $rootScope.locOfAttendees[value.location].push(value.name);
          } else {
            $rootScope.locOfAttendees[value.location] = [value.name];
          }
        }
      };
      console.log($rootScope.locOfAttendees.length);
      if (isNotEmpty($rootScope.locOfAttendees)) {
        $state.go("app.confirmAttendees");
      }
    };
  })

  .controller('ConfirmAttendingController', function ($scope, $state, $stateParams, $rootScope) {
    $rootScope.submitParticipants = function() {
      $rootScope.bookingDetails.numberOfParticipants = $rootScope.attendees.length;
      $state.go("app.laterBooking");
    }
  });
