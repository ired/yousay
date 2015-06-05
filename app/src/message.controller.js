(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'messageFactory', '$routeParams', '$route']

  function MessageController($scope, messageFactory, $routeParams, $route) {

    var vm = this;
    
    messageFactory.readUrl($routeParams.message)

    vm.writeNewMessage = writeNewMessage;
    vm.message = messageFactory.messageObj.message || 'I love hamburgers, and I love you!';
    vm.inputPlaceholder = messageFactory.messageObj.message;
    vm.reloadView = reloadView;
    vm.inputMessage = '';

    messageFactory.messageObj.message = vm.message;
    messageFactory.saveUrl(vm.message);

    function writeNewMessage() {
      messageFactory.changeUrl(vm.inputMessage);
      messageFactory.saveUrl();
      return;
    }

    function reloadView() {
      $route.reload();
    }

  }
})();