(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'messageFactory', '$routeParams', '$route']

  function MessageController($scope, messageFactory, $routeParams, $route) {

    var vm = this;


    vm.writeNewMessage = writeNewMessage;
    vm.message = messageFactory.readUrl($routeParams.message) || 'What is this place?! I love it!';
    vm.reloadView = reloadView;
    vm.inputMessage = '';

    messageFactory.messageObj.message = vm.message;
    //messageFactory.saveUrl(vm.message);

    function writeNewMessage() {
      messageFactory.changeUrl(vm.inputMessage);
      messageFactory.saveUrl();
    }

    function reloadView() {
      $route.reload();
    }

  }
})();