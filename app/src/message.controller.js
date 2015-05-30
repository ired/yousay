(function() {
  'use strict';

  angular
    .module('emaily')
    .controller('MessageController', MessageController);

  //MsgController.$inject = [];

  function MessageController() {

    var vm = this;

    vm.email = "";
    vm.subject = "";
    vm.message = "";

  }
})();