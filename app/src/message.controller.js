(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'messageFactory', '$routeParams', '$route']

  function MessageController($scope, messageFactory, $routeParams, $route) {

    var vm = this;


    vm.writeNewMessage = writeNewMessage;
    vm.message = messageFactory.readUrl($routeParams.message) || 'I love hamburgers, and I love you!';
    vm.reloadView = reloadView;
    vm.inputMessage = '';

    messageFactory.messageObj.message = vm.message;
    //messageFactory.saveUrl(vm.message);

    function writeNewMessage() {
      messageFactory.changeUrl(vm.inputMessage);
      messageFactory.saveUrl();
      console.log('msgmsg1: '+messageFactory.messageObj.encodedMessage);
    }

    function reloadView() {
      $route.reload();
    }

  }
})();