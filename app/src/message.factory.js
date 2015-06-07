(function() {
  'use strict';

  angular
    .module('yousay')
    .factory('messageFactory', messageFactory);

  messageFactory.$inject = ['$location','$routeParams', 'base64'];

  function messageFactory($location, $routeParams, base64) {
    
    var _messageObj = {};

    var service = {
      messageObj         : _messageObj,
      readUrl            : readUrl,
      saveUrl            : saveUrl,
      changeUrl          : changeUrl,
      encodeBase64Url    : encodeBase64Url,
      decodeBase64Url    : decodeBase64Url,
    };

    return service;

    //////////////


    function readUrl(encodedMessage) {
      _messageObj.message = decodeBase64Url(encodedMessage);
      return _messageObj.message;
    }


    function changeUrl(message) {
      _messageObj.encodedMessage = encodeBase64Url(message);
      return $location.path('/m/'+ _messageObj.encodedMessage);
    }


    function saveUrl(message) {
      var location = $location.absUrl(),
          defaultUrl,
          re;
      
      if (message) {
        re = /share/;
        defaultUrl = location.replace(re,'m');
      }
      
      _messageObj.shareUrl = defaultUrl || location;

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