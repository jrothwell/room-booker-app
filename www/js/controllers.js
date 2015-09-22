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

  })
  .controller('MyLocationController', function ($scope, $stateParams, $rootScope, $ionicPlatform, $cordovaBeacon, $http) {

    $scope.beacons = {};
 
    $ionicPlatform.ready(function() {
 
        $cordovaBeacon.requestWhenInUseAuthorization();
 
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            var data = [];
            for(var i = 0; i < pluginResult.beacons.length; i++) {
              if (pluginResult.beacons[i].major == 14470) {
                data.push({
                  "sensorId": "FUTURE-3",
                  "distance": pluginResult.beacons[i].rssi,
                });
              }
              else if (pluginResult.beacons[i].major == 1000) {
                data.push({
                  "sensorId": "FUTURE-2",
                  "distance": pluginResult.beacons[i].rssi,
                });
              } else {
                data.push({
                  "sensorId": "FUTURE-1",
                  "distance": pluginResult.beacons[i].rssi,
                });
              }
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                $http.put('http://10.132.32.162:3030/phones/sam/beaconData', data)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(response) {
                    console.log(response);
                });

            }
            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Light Blue", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 14470, 61580));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Purple", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 1000, 1));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Green", "b9407f30-f5f8-466e-aff9-25556b57fe6d", 4473, 1));
 
    });

  });
