(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('NavController', NavController);

  NavController.$inject = ['$rootScope', '$location', 'snapRemote'];

  function NavController($rootScope, $location, snapRemote) {

    var nav = this;

    nav.locationSwith = locationSwith;
    nav.closeMenu = closeMenu;

    $rootScope.$on('$routeChangeSuccess', closeMenu);


    function locationSwith(path) {
      $location.path(path);
    }


    function closeMenu() {
      snapRemote.close();
    }


  }
})();