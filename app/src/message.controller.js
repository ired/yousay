(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'messageFactory','$location','$routeParams'];

  function MessageController($scope, messageFactory, $location, $routeParams) {

    var vm = this;

    vm.newMessage = newMessage;
    vm.message = messageFactory.decodeBase64Url($routeParams.message);
    vm.videoId = messageFactory.decodeBase64Url($routeParams.vodeoId);
    vm.inputMessage = '';
    vm.inputVideoUrl = '';


    vm.playerVars = {
      controls: 0,
      autoplay: 0,
      modestbranding: 1
    }
    
    $scope.$on('$routeChangeSuccess', function() {
      var msg = $routeParams.message,
          videoId = $routeParams.videoId;

      messageFactory.readUrl(msg,videoId);

      vm.message = messageFactory.srv.message;
      vm.videoId = messageFactory.srv.videoId;
    });

    $scope.$on('youtube.player.ended', function() {
      $scope.bgPlayer.playVideo();
    });

    function newMessage() {
      // var videoId = getIdFromURL(vm.inputVideoUrl)
      var videoId = messageFactory.getIdFromURL('https://www.youtube.com/watch?v=67qqEcGDC0s')
      // messageFactory.changeUrl(vm.inputMessage, vm.inputVideoUrl);
      messageFactory.changeUrl(vm.inputMessage, messageFactory.srv.videoId);
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

    messageFactory.$inject = ['$location','$routeParams', 'base64','youtubeEmbedUtils'];

    function messageFactory($location, $routeParams, base64, youtubeEmbedUtils) {
      
      var _srv = {};

      var service = {
        srv             : _srv,
        readUrl         : readUrl,
        changeUrl       : changeUrl,
        encodeBase64Url : encodeBase64Url,
        decodeBase64Url : decodeBase64Url,
        getIdFromURL    : getIdFromURL
      };

      return service;

      //////////////


      function readUrl(encodedMessage, videoIdEncoded) {
        _srv.message = decodeBase64Url(encodedMessage);
        _srv.videoId = decodeBase64Url(videoIdEncoded);
      }

      function changeUrl(message, videoId) {
        var messageEncoded, videoIdEncoded;

        messageEncoded = encodeBase64Url(message);
        videoIdEncoded = encodeBase64Url(videoId);

        return $location.path('/m/'+ messageEncoded + '/' + videoIdEncoded);
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


      function getIdFromURL (url) {
        return youtubeEmbedUtils.getIdFromURL(url);
      }

    }

})();