(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('NavController', NavController);

  NavController.$inject = ['$rootScope', '$location', 'snapRemote'];

  function NavController($rootScope, $location, snapRemote) {

    var nav = this;

    nav.locationSwith = locationSwith;
    

    $rootScope.$on('$routeChangeSuccess', utilsOnRouteChange);


    function locationSwith(path) {
      $location.path(path);
    }


    function utilsOnRouteChange() {
      snapRemote.close();
    }

  }
})();