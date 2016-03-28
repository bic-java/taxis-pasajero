angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
                    function (isOpen) {
                        if (isOpen) {
                            $scope.hiddenMenu = false;
                        } else {
                            $scope.hiddenMenu = true;
                        }

                    });

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
        })

        .controller('PlaylistsCtrl', function ($scope) {
            $scope.playlists = [
                {title: 'Reggae', id: 1},
                {title: 'Chill', id: 2},
                {title: 'Dubstep', id: 3},
                {title: 'Indie', id: 4},
                {title: 'Rap', id: 5},
                {title: 'Cowbell', id: 6}
            ];
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams) {
        })
//********** inicio controlador mapa***************//
        .controller('BrowseCtrl', function ($scope, $stateParams) {
            var map;
            var currentPosition = null;
            var startPositionMarker = false;
            var startPositionLat = null;
            var startPositionLng = null;
            var finalPositionMarker = false;
            $scope.address = 'puebla'


            /**
             * Se ejecuta despues de cargar el mapa en pantalla
             * @param {type} map = mapa
             * @returns {undefined}
             */
            function onMapInit(map) {
                console.info('Map Init');
                $scope.getMyLocation();
                // actualiza el marcador de origen al mover el mapa
                map.on(plugin.google.maps.event.CAMERA_CHANGE, function (position) {
                    $scope.dragAddress(position.target);
                });
            }
            /**
             * Carga al iniciar el modulo
             * @returns {undefined}
             */
            $scope.initMap = function () {
                var mapDiv = document.getElementById("mapa");
                console.log(mapDiv);
                // instancia el mapa
                map = plugin.google.maps.Map.getMap(mapDiv);
                // You have to wait the MAP_READY event.
                map.on(plugin.google.maps.event.MAP_READY, onMapInit);

            };
            /**
             * Se ejecuta al obtener la ubicación actual del dispositivo
             * @param {type} location
             * @returns {undefined}
             */
            var onGetMyLocation = function (location) {

                //***************
                map.animateCamera({
                    'target': location.latLng,
                    'zoom': 17
                }, function () {
                    $scope.dragAddress(location.latLng);

                });
            };
            var onError = function (msg) {
                alert("error: " + msg);
            };

            /**
             * Obtiene la ubicación del dispotivo.
             * @returns {undefined}
             */
            $scope.getMyLocation = function () {
                map.getMyLocation(onGetMyLocation, onError);
            };
            /**
             * Obtener las coordenas de una direccion que escribes
             * @returns {undefined}
             */
            $scope.searchAddress = function (address) {
                var request = {
                    'address': address
                };
                plugin.google.maps.Geocoder.geocode(request, function (results) {
                    if (results.length) {
                        var result = results[0];
                        var position = result.position;
                        //***************
                        map.animateCamera({
                            'target': position,
                            'zoom': 17
                        }, function () {
                            //marker.showInfoWindow();
                            $scope.dragAddress(position);
                        });
                    } else {
                        alert("Not found");
                    }

                });
            };
            /**
             * revertir geocoding
             * @param {type} address
             * @returns {undefined}
             */
            $scope.dragAddress = function (address) {
                var request = {
                    'position': address
                };
                plugin.google.maps.Geocoder.geocode(request, function (results) {
                    if (results.length) {
                        var result = results[0];
                        var position = result.position;
                        var address = [
                            result.subThoroughfare || "",
                            result.thoroughfare || "",
                            result.locality || "",
                            result.adminArea || "",
                            result.postalCode || "",
                            result.country || ""].join(", ");
                        $scope.$apply(function ($scope) {
                            $scope.address = address;
                            currentPosition = position;
                            console.log('lastPosition=', position);
                        });
                    } else {
                        alert("Not found");
                    }
                });
            };
            /**
             * Obtener las coordenas de una direccion de inicio del viaje
             * @returns {undefined}
             */
            $scope.setStartPosition = function () {
                console.log(currentPosition);
                if (!startPositionMarker) {
                    map.addMarker({
                        'position': currentPosition,
                        'icon': {
                            url: './img/person-marker.png'
                        }
                    }, function (marker) {
                        startPositionMarker = marker;
                        startPositionLat = currentPosition.lat;
                        startPositionLng = currentPosition.lng;
                    });
                } else {
                    startPositionMarker.remove();
                    startPositionMarker = false;
                    $scope.setStartPosition();
                }
            };

            /**
             * Obtener las coordenas de una direccion de final del viaje
             * @returns {undefined}
             */
            $scope.setFinalPosition = function () {
                console.log(currentPosition);
                if (!finalPositionMarker) {
                    map.addMarker({
                        'position': currentPosition,
                        'icon': {
                            url: './img/end.png'
                        }
                    }, function (marker) {
                        finalPositionMarker = marker;
                       
                        plugin.google.maps.external.launchNavigation({
                            "zoom": 5,
                            "from": startPositionLat+','+ startPositionLng,
                            "to": currentPosition.lat +','+currentPosition.lng
                        });
                        //console.log('from:',startPosition,'to:',currentPosition);
                        //console.log('from:',startPositionLat+','+ startPositionLng,'to:',currentPosition.lat +','+currentPosition.lng);
                    });
                } else {
                    finalPositionMarker.remove();
                    finalPositionMarker = false;
                    $scope.setFinalPosition();
                }
            };
        })
        ;
