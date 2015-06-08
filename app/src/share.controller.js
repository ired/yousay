(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('ShareController', ShareController);

  ShareController.$inject = ['$routeParams', 'messageFactory'];

  function ShareController($routeParams, messageFactory) {

    var share = this;

    share.messageEncoded = $routeParams.message || '';
    share.message = messageFactory.messageObj.message || messageFactory.readUrl($routeParams.message);
    share.shareUrl = messageFactory.messageObj.shareUrl || messageFactory.saveUrl($routeParams.message);

  }
})();