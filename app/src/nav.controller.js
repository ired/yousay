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
      var _path = path;
      if ( path === '/share/' && messageFactory.messageObj.encodedMessage ) {
        _path = path + messageFactory.messageObj.encodedMessage;
      }
      $location.path(_path);
    }


    function utilsOnRouteChange() {
      snapRemote.close();
    }

  }
})();