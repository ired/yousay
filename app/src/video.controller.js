(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('VideoController', VideoController);

  VideoController.$inject = [];

  function VideoController() {

    var vm = this;

    vm.toggleLeftNav = toggleLeftNav;
    vm.loginUrl = '#/';
    vm.regUrl = '#/';
    
    function toggleLeftNav() {
      // $mdSidenav('left').toggle();
    }

  }
})();