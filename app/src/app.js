(function() {
  'use strict';

  angular
    .module('yousay',[
        'ngAria',
        'ngRoute',
        'ab-base64',
        'angularTypewrite',
        'snap',
        'luegg.directives'
    ])
    .config(['$routeProvider', 'snapRemoteProvider',
      function($routeProvider, snapRemoteProvider) {

        $routeProvider
            .when('/', {
                controller: 'MessageController',
                controllerAs: 'vm',
                templateUrl: 'showMessage.html'
            })
            .when('/new', {
                controller: 'MessageController',
                controllerAs: 'vm',
                templateUrl: 'newMessage.html'
            })
            .when ('/m/:message', {
                controller: 'MessageController',
                controllerAs: 'vm',
                templateUrl: 'showMessage.html'
            })
            .when ('/share/', {
                controller: 'ShareController',
                controllerAs: 'share',
                templateUrl: 'shareMessage.html'
            })
            .when ('/share/:message', {
                controller: 'ShareController',
                controllerAs: 'share',
                templateUrl: 'shareMessage.html'
            })
            .otherwise({ redirectTo: '/' });


            snapRemoteProvider.globalOptions = {
              disable: 'right',
              tapToClose: true,
              addBodyClasses: false,
              maxPosition: 250
            }

    }])
    .run(['$rootScope', '$location', 
      function($rootScope,$location) {
        var re = /\w+/i,
            bodyPathClass = [];

        $rootScope.$on('$routeChangeSuccess', function(ev, data) {
          bodyPathClass = $location.path().match(re) || ['i'];

          // [bodyClass, true/false]. true or false for scroll-glue directive
          $rootScope.bodyPathClass = [ bodyPathClass[0],
                                      (bodyPathClass[0] === 'm'||bodyPathClass[0] === 'i') || false ];

       });

    }]);

})();