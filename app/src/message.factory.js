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
      saveUrl         : saveUrl,
      changeUrl       : changeUrl,
      encodeBase64Url : encodeBase64Url,
      decodeBase64Url : decodeBase64Url,
    };

    return service;

    //////////////


    function readUrl(encodedMessage) {
      _messageObj.encodedMessage = encodedMessage; 
      _messageObj.message = decodeBase64Url(encodedMessage);
      return _messageObj.message;
    }


    function changeUrl(message) {
      var messageEncoded = encodeBase64Url(message);
      return $location.path('/m/'+ messageEncoded);
    }


    function saveUrl(message) {
      var defaultUrl;
      
      defaultUrl = message ? $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#/m/' + encodeBase64Url(message) : '';
      _messageObj.shareUrl = defaultUrl || $location.absUrl() ;
      return _messageObj.shareUrl;
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