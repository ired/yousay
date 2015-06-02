(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', '$location','$routeParams', 'messageFactory'];

  function MessageController($scope, $location, $routeParams, messageFactory) {

    var vm = this;

    vm.newMessage = newMessage;
    vm.message = messageFactory.decodeBase64Url($routeParams.message) || 'default message';
    vm.video = messageFactory.decodeBase64Url($routeParams.video) || 'default video';
    vm.inputMessage = '';
    console.log(vm.message);


    function newMessage() {
      var message, video;

      message = messageFactory.encodeBase64Url(vm.inputMessage);
      video = messageFactory.encodeBase64Url(vm.video);

      $location.path('/m/'+ message + '/' + video);
      
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

    messageFactory.$inject = ['base64'];

    function messageFactory(base64) {
      var service = {
        encodeBase64Url : encodeBase64Url,
        decodeBase64Url : decodeBase64Url
      };

      return service;

      //////////////

      function encodeBase64Url(input) {
          return base64.urlencode(input)
      } 

      function decodeBase64Url(input) {
        try {
          return base64.urldecode(input)
        } catch (e) {
          console.log('base64 exception')
        }

      }

    }

})();