(function() {
  'use strict';

  angular
      .module('emaily')
      .controller('VideoController', VideoController);

  VideoController.$inject = [];

  function VideoController($mdSidenav) {

    var vm = this;

    vm.toggleLeftNav = toggleLeftNav;
    vm.loginUrl = '#/';
    vm.regUrl = '#/';
    
    function toggleLeftNav() {
      $mdSidenav('left').toggle();
    }

  }
})();