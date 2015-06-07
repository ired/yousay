(function() {
  'use strict';

  angular
    .module('yousay')
    .controller('NavController', NavController);

  NavController.$inject = ['$rootScope', '$location', 'snapRemote', 'messageFactory'];

  function NavController($rootScope, $location, snapRemote, messageFactory) {

    var nav = this;

    nav.locationSwith = locationSwith;
    

    $rootScope.$on('$routeChangeSuccess', utilsOnRouteChange);


    function locationSwith(path) {
      if ( path === '/share/' && messageFactory.messageObj.encodedMessage ) {
        path = path + messageFactory.messageObj.encodedMessage;
      }
      $location.path(path);
      console.log('msgmsg: '+messageFactory.messageObj.encodedMessage);
    }


    function utilsOnRouteChange() {
      snapRemote.close();
    }

  }
})();