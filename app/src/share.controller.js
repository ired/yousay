(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('ShareController', ShareController);

  ShareController.$inject = ['messageFactory'];

  function ShareController(messageFactory) {

    var share = this;

    share.message = messageFactory.messageObj.message;
    share.shareUrl = messageFactory.messageObj.shareUrl;

  }
})();