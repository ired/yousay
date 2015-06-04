(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'messageFactory','$location','$routeParams'];

  function MessageController($scope, messageFactory, $location, $routeParams) {

    var vm = this;

    vm.newMessage = newMessage;
    vm.message = messageFactory.decodeBase64Url($routeParams.message) || 'Hello! What are you doing here?';
    vm.inputMessage = '';
    vm.test = test;

    function test() {
      console.log('mEadsufhiahsdv!!!');
      $location.path('/new/');
    }

    function newMessage() {
      messageFactory.changeUrl(vm.inputMessage);
      vm.inputMessage = '';
      return;
    }


  }
})();

(function() {
  'use strict';

  angular
    .module('yousay')
    .factory('messageFactory', messageFactory);

    messageFactory.$inject = ['$location','$routeParams', 'base64'];

    function messageFactory($location, $routeParams, base64) {
      
      var _messageObj = {};

      var service = {
        messageObj      : _messageObj,
        readUrl         : readUrl,
        changeUrl       : changeUrl,
        encodeBase64Url : encodeBase64Url,
        decodeBase64Url : decodeBase64Url,
      };

      return service;

      //////////////


      function readUrl(encodedMessage) {
        _messageObj.message = decodeBase64Url(encodedMessage);
      }

      function changeUrl(message) {
        var messageEncoded;

        messageEncoded = encodeBase64Url(message);

        return $location.path('/m/'+ messageEncoded);
      }


      function encodeBase64Url(input) {
          return base64.urlencode(input)
      }


      function decodeBase64Url(input) {
        try {
          return base64.urldecode(input);
        } catch (e) {
          console.log('base64 exception')
        }
      }

    }

})();